import { initTRPC } from '@trpc/server';
import { z } from 'zod';

export const t = initTRPC.create();
export const appRouter = t.router({
  getRandomIdFromId: t.procedure
    .input(
      z.object({
        id: z.string()
      }),
    )
    .query(({ input }) => {
      return {
        id: `${input.id}-${Date.now().toString()}`
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;