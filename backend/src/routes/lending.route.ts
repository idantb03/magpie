import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { LendingService } from '../application/services/lending.service';
import { CreateLendingDTO, ReturnBookDTO } from '../domain/dtos/lending.service.dto';

const lendingService = new LendingService();

interface IParams {
  id: string;
}

export async function lendingRoutes(fastify: FastifyInstance) {
  // Get all lendings
  fastify.get('/', {
    schema: {
      tags: ['lendings'],
      summary: 'Get all lending records',
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
                  bookId: { type: 'number' },
                  memberId: { type: 'number' },
                  borrowedDate: { type: 'string' },
                  dueDate: { type: 'string' },
                  returnDate: { type: 'string', nullable: true },
                  status: { type: 'string' },
                  notes: { type: 'string', nullable: true },
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
    const lendings = await lendingService.getAllLendings();
    return reply.send(lendings);
  });

  // Get lending by id
  fastify.get('/:id', {
    schema: {
      tags: ['lendings'],
      summary: 'Get lending record by id',
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
            bookId: { type: 'number' },
            memberId: { type: 'number' },
            borrowedDate: { type: 'string' },
            dueDate: { type: 'string' },
            returnDate: { type: 'string', nullable: true },
            status: { type: 'string' }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Params: IParams }>, reply: FastifyReply) => {
    try {
      const id = parseInt(request.params.id);
      const lending = await lendingService.getLendingById(id);
      return reply.send(lending);
    } catch (error) {
      reply.code(404).send({ error: error });
    }
  });

  // Create lending (lend book)
  fastify.post('/', {
    schema: {
      tags: ['lendings'],
      summary: 'Create a new lending record',
      body: {
        type: 'object',
        required: ['bookId', 'memberId', 'borrowedDate', 'dueDate'],
        properties: {
          bookId: { type: 'number' },
          memberId: { type: 'number' },
          borrowedDate: { type: 'string' },
          dueDate: { type: 'string' },
          notes: { type: 'string' }
        }
      }
    }
  }, async (request: FastifyRequest<{ Body: CreateLendingDTO }>, reply: FastifyReply) => {
    try {
      const lending = await lendingService.lendBook(request.body);
      return reply.code(201).send(lending);
    } catch (error) {
      reply.code(400).send({ error: error });
    }
  });

  // Return book
  fastify.put('/:id/return', {
    schema: {
      tags: ['lendings'],
      summary: 'Return a book',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      body: {
        type: 'object',
        required: ['returnDate'],
        properties: {
          returnDate: { type: 'string' },
          notes: { type: 'string' }
        }
      }
    }
  }, async (request: FastifyRequest<{ Params: IParams; Body: ReturnBookDTO }>, reply: FastifyReply) => {
    try {
      const id = parseInt(request.params.id);
      const lending = await lendingService.returnBook(id, request.body);
      return reply.send(lending);
    } catch (error) {
      reply.code(400).send({ error: error });
    }
  });

  // Delete lending
  fastify.delete('/:id', {
    schema: {
      tags: ['lendings'],
      summary: 'Delete a lending record',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      }
    }
  }, async (request: FastifyRequest<{ Params: IParams }>, reply: FastifyReply) => {
    try {
      const id = parseInt(request.params.id);
      await lendingService.deleteLending(id);
      return reply.code(204).send();
    } catch (error) {
      reply.code(400).send({ error: error });
    }
  });
} 