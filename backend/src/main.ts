import Fastify, { FastifyInstance } from 'fastify';
import { bookRoutes } from './routes/book.route';
import { lendingRoutes } from './routes/lending.route';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyCors from '@fastify/cors';

const server: FastifyInstance = Fastify({
  logger: true
});

// Add CORS configuration
server.register(fastifyCors, {
  origin: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

server.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'Magpie API',
      description: 'Magpie API documentation',
      version: '1.0.0'
    },
    securityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      }
    },
    tags: [
      { name: 'books', description: 'Book related endpoints' },
      { name: 'lendings', description: 'Lending related endpoints' },
      { name: 'auth', description: 'Authentication related endpoints' }
    ],
  }
});

server.register(fastifySwaggerUi, {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  }
});

// Register routes
server.register(bookRoutes, { prefix: '/api/books' });
server.register(lendingRoutes, { prefix: '/api/lendings' });

// Error handler
server.setErrorHandler((error, request, reply) => {
  server.log.error(error);
  reply.status(error.statusCode || 500).send({
    error: error.message
  });
});

const start = async () => {
  try {
    await server.listen({ port: 8000 });
    console.log('Server is running on port 8000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start(); 

