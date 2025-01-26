import { FastifyRequest, FastifyReply } from 'fastify';
import { JwtPayload, verify } from 'jsonwebtoken';

declare module 'fastify' {
  interface FastifyRequest {
    user?: JwtPayload
  }
}

export async function authenticateRequest(request: FastifyRequest, reply: FastifyReply) {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new Error('Missing or invalid authorization header');
    }

    const token = authHeader.substring(7);
    const decoded = verify(token, process.env.NEXTAUTH_SECRET!) as JwtPayload;
    
    request.user = decoded;
  } catch (error) {
    reply.status(401).send({ error: 'Unauthorized' });
  }
}