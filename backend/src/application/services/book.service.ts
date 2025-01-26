import { Book, PrismaClient, BookStatus } from '@prisma/client';
import { BookRepository } from '../../infrastructure/repositories/book.repository';
import { PaginationParams } from '../../domain/interface/IRepository';
import { CreateBookDTO } from '../../domain/dtos/book.service.dto';

export class BookService {
  private bookRepository: BookRepository;
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
    this.bookRepository = new BookRepository(this.prisma);
  }

  async getBookById(id: number): Promise<Book | null> {
    const book = await this.bookRepository.findById(id);
    if (!book) {
      throw new Error('Book not found');
    }
    return book;
  }

  async getAllBooks(params?: PaginationParams) {
    return this.bookRepository.findAll(params);
  }

  async createBook(data: CreateBookDTO): Promise<Book> {
    if (!data.title || !data.author || !data.isbn || !data.quantity || !data.categoryId || !data.createdBy) {
      throw new Error('Missing required fields');
    }

    if (data.quantity < 0) {
      throw new Error('Quantity must be greater than or equal to 0');
    }

    return this.bookRepository.create({
      ...data,
      description: data.description || null,
      publisher: data.publisher || null,
      publishYear: data.publishYear || null,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  async updateBook(id: number, data: Partial<Book>): Promise<Book> {
    const existingBook = await this.bookRepository.findById(id) as Book & { bookStatus: BookStatus };
    if (!existingBook) {
      throw new Error('Book not found');
    }

    if (data.quantity !== undefined) {
      const diff = data.quantity - existingBook.quantity;
      await this.bookRepository.update(id, {
        ...data,
        bookStatus: {
          update: {
            availableQty: {
              increment: diff
            }
          }
        }
      });
    }

    return this.bookRepository.update(id, data);
  }

  async deleteBook(id: number): Promise<void> {
    const existingBook = await this.bookRepository.findById(id);
    if (!existingBook) {
      throw new Error('Book not found');
    }

    if (existingBook.bookStatus && existingBook.bookStatus.borrowedQty > 0) {
      throw new Error('Cannot delete book with active lendings');
    }

    await this.bookRepository.delete(id);
  }
}