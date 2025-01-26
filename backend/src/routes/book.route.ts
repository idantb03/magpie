import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { BookService } from '../application/services/book.service';
import { CreateBookDTO } from '../domain/dtos/book.service.dto';

const bookService = new BookService();

interface IParams {
  id: string;
}

export async function bookRoutes(fastify: FastifyInstance) {
  // Get all books
  fastify.get('/', {
    schema: {
      tags: ['books'],
      summary: 'Get all books',
      response: {
        200: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  title: { type: 'string' },
                  author: { type: 'string' },
                  isbn: { type: 'string' },
                  quantity: { type: 'number' },
                  categoryId: { type: 'number' },
                  description: { type: 'string', nullable: true },
                  publisher: { type: 'string', nullable: true },
                  publishYear: { type: 'number', nullable: true },
                  active: { type: 'boolean' },
                  createdBy: { type: 'number' },
                  createdAt: { type: 'string' },
                  updatedAt: { type: 'string' }
                }
              }
            },
            total: { type: 'number' },
            page: { type: 'number' },
            limit: { type: 'number' },
            totalPages: { type: 'number' }
          }
        }
      }
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    const books = await bookService.getAllBooks();
    return reply.send(books);
  });

  // Get book by id
  fastify.get('/:id', {
    schema: {
      tags: ['books'],
      summary: 'Get book by id',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            title: { type: 'string' },
            author: { type: 'string' }
          }
        },
        404: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Params: IParams }>, reply: FastifyReply) => {
    try {
      const id = parseInt(request.params.id);
      const book = await bookService.getBookById(id);
      return reply.send(book);
    } catch (error) {
      reply.code(404).send({ error: error });
    }
  });

  // Create book
  fastify.post('/', {
    schema: {
      tags: ['books'],
      summary: 'Create a new book',
      body: {
        type: 'object',
        required: ['title', 'author'],
        properties: {
          title: { type: 'string' },
          author: { type: 'string' }
        }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            title: { type: 'string' },
            author: { type: 'string' }
          }
        },
        400: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Body: CreateBookDTO }>, reply: FastifyReply) => {
    try {
      const book = await bookService.createBook(request.body);
      return reply.code(201).send(book);
    } catch (error) {
      reply.code(400).send({ error: error });
    }
  });

  // Update book
  fastify.put('/:id', async (request: FastifyRequest<{ Params: IParams; Body: Partial<CreateBookDTO> }>, reply: FastifyReply) => {
    try {
      const id = parseInt(request.params.id);
      const book = await bookService.updateBook(id, request.body);
      return reply.send(book);
    } catch (error) {
      reply.code(404).send({ error: error });
    }
  });

  // Delete book
  fastify.delete('/:id', async (request: FastifyRequest<{ Params: IParams }>, reply: FastifyReply) => {
    try {
      const id = parseInt(request.params.id);
      await bookService.deleteBook(id);
      return reply.code(204).send();
    } catch (error) {
      reply.code(404).send({ error: error });
    }
  });
}