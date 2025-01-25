import * as http from 'http';
import Fastify, { FastifyBaseLogger, FastifyInstance, FastifyTypeProvider } from 'fastify';

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

function bookRoutes(instance: FastifyInstance<http.Server, any, any, FastifyBaseLogger, FastifyTypeProvider>, opts: { prefix: string; }, done: (err?: Error | undefined) => void): void {
  throw new Error('Function not implemented.');
}
