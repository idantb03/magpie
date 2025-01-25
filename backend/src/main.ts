import Fastify, { FastifyInstance } from 'fastify';
import { bookRoutes } from './interface/routes/book.route';

const server: FastifyInstance = Fastify({
  logger: true
});

// Register routes
server.register(bookRoutes, { prefix: '/api/books' });

// Error handler
server.setErrorHandler((error, request, reply) => {
  server.log.error(error);
  reply.status(error.statusCode || 500).send({
    error: error.message
  });
});

const start = async () => {
  try {
    await server.listen({ port: 3000 });
    console.log('Server is running on port 3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start(); 

