import { type inferAsyncReturnType } from '@trpc/server';
import { type CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

export function createContext({ req, res }: CreateFastifyContextOptions) {
  return { req, res, prisma: res.server.prisma };
}

export type Context = inferAsyncReturnType<typeof createContext>;