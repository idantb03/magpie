import { PrismaClient, Book, BookStatus } from '@prisma/client';
import { IRepository, PaginationParams, PaginatedResult } from '../../domain/interface/IRepository';

export class BookRepository implements IRepository<Book> {
  constructor(private prisma: PrismaClient) {}

  async findById(id: number): Promise<(Book & { bookStatus: BookStatus | null }) | null> {
    return this.prisma.book.findUnique({
      where: { id },
      include: {
        category: true,
        bookStatus: true,
      },
    });
  }

  async findAll(params?: PaginationParams): Promise<PaginatedResult<Book>> {
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.book.findMany({
        skip,
        take: limit,
        include: {
          category: true,
          bookStatus: true,
        },
      }),
      this.prisma.book.count(),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async create(data: Omit<Book, 'id'>): Promise<Book> {
    const book = await this.prisma.book.create({
      data: {
        ...data,
        bookStatus: {
          create: {
            availableQty: data.quantity,
            borrowedQty: 0,
          },
        },
      },
      include: {
        category: true,
        bookStatus: true,
      },
    });
    return book;
  }

  async update(id: number, data: Partial<Book> & { bookStatus?: { update: { availableQty: { increment: number } } } }): Promise<Book> {
    return this.prisma.book.update({
      where: { id },
      data: {
        ...data,
        bookStatus: data.bookStatus,
      },
      include: {
        category: true,
        bookStatus: true,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.book.delete({
      where: { id },
    });
  }
}