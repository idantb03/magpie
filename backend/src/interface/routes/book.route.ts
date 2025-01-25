import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { BookService } from '../../application/services/book.service';
import { CreateBookDTO } from '../../domain/dtos/book.service.dto';

const bookService = new BookService();

interface IParams {
  id: string;
}

export async function bookRoutes(fastify: FastifyInstance) {
  // Get all books
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const books = await bookService.getAllBooks();
    return reply.send(books);
  });

  // Get book by id
  fastify.get('/:id', async (request: FastifyRequest<{ Params: IParams }>, reply: FastifyReply) => {
    try {
      const id = parseInt(request.params.id);
      const book = await bookService.getBookById(id);
      return reply.send(book);
    } catch (error) {
      reply.code(404).send({ error: error });
    }
  });

  // Create book
  fastify.post('/', async (request: FastifyRequest<{ Body: CreateBookDTO }>, reply: FastifyReply) => {
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