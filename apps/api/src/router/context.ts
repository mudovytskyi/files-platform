import { FastifyRequest } from 'fastify';

export type Context = {
  req: FastifyRequest;
};

export async function createContext({ req }: Context) {
  return { req };
}
