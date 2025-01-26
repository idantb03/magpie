import { Lending, PrismaClient } from '@prisma/client';
import { LendingRepository } from '../../infrastructure/repositories/lending.repository';
import { PaginationParams } from '../../domain/interface/IRepository';
import { CreateLendingDTO, ReturnBookDTO } from '../../domain/dtos/lending.service.dto';

export class LendingService {
  private lendingRepository: LendingRepository;
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
    this.lendingRepository = new LendingRepository(this.prisma);
  }

  async getLendingById(id: number): Promise<Lending | null> {
    const lending = await this.lendingRepository.findById(id);
    if (!lending) {
      throw new Error('Lending record not found');
    }
    return lending;
  }

  async getAllLendings(params?: PaginationParams) {
    return this.lendingRepository.findAll(params);
  }

  async lendBook(data: CreateLendingDTO): Promise<Lending> {
    const book = await this.prisma.book.findUnique({
      where: { id: data.bookId },
      include: { bookStatus: true },
    });

    if (!book) {
      throw new Error('Book not found');
    }

    if (!book.bookStatus || book.bookStatus.availableQty <= 0) {
      throw new Error('Book is not available for lending');
    }

    const member = await this.prisma.member.findUnique({
      where: { id: data.memberId },
    });

    if (!member) {
      throw new Error('Member not found');
    }

    if (member.status !== 'ACTIVE') {
      throw new Error('Member is not active');
    }

    return this.lendingRepository.create({
      ...data,
      returnDate: null,
      notes: data.notes || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async returnBook(id: number, data: ReturnBookDTO): Promise<Lending> {
    const lending = await this.lendingRepository.findById(id);
    if (!lending) {
      throw new Error('Lending record not found');
    }

    if (lending.returnDate) {
      throw new Error('Book has already been returned');
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.bookStatus.update({
        where: { bookId: lending.bookId },
        data: {
          availableQty: { increment: 1 },
          borrowedQty: { decrement: 1 },
        },
      });

      return this.lendingRepository.update(id, {
        returnDate: data.returnDate,
        status: 'RETURNED',
        notes: data.notes || lending.notes,
      });
    });
  }

  async deleteLending(id: number): Promise<void> {
    const lending = await this.lendingRepository.findById(id);
    if (!lending) {
      throw new Error('Lending record not found');
    }

    if (!lending.returnDate) {
      throw new Error('Cannot delete active lending record');
    }

    await this.lendingRepository.delete(id);
  }
} 