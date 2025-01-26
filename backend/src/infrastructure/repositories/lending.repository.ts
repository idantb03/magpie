import { PrismaClient, Lending } from '@prisma/client';
import { IRepository, PaginationParams, PaginatedResult } from '../../domain/interface/IRepository';

export class LendingRepository implements IRepository<Lending> {
  constructor(private prisma: PrismaClient) {}

  async findById(id: number): Promise<Lending | null> {
    return this.prisma.lending.findUnique({
      where: { id },
      include: {
        book: {
          include: { bookStatus: true }
        },
        member: true,
      },
    });
  }

  async findAll(params?: PaginationParams): Promise<PaginatedResult<Lending>> {
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.lending.findMany({
        skip,
        take: limit,
        include: {
          book: {
            include: { bookStatus: true }
          },
          member: true,
        },
        orderBy: {
          borrowedDate: 'desc',
        },
      }),
      this.prisma.lending.count(),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async create(data: Omit<Lending, 'id'>): Promise<Lending> {
    return this.prisma.$transaction(async (tx) => {
      await tx.bookStatus.update({
        where: { bookId: data.bookId },
        data: {
          availableQty: { decrement: 1 },
          borrowedQty: { increment: 1 },
        },
      });

      return tx.lending.create({
        data,
        include: {
          book: {
            include: { bookStatus: true }
          },
          member: true,
        },
      });
    });
  }

  async update(id: number, data: Partial<Lending>): Promise<Lending> {
    return this.prisma.lending.update({
      where: { id },
      data,
      include: {
        book: {
          include: { bookStatus: true }
        },
        member: true,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.lending.delete({
      where: { id },
    });
  }
} 