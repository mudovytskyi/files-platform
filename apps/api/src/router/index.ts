import { postsRouter } from './routers/posts';
import { router } from './trpc';
import { apiRouter } from './routers/api';

export const appRouter = router({
  ...apiRouter._def.procedures,
  ...postsRouter._def.procedures,
});

export type AppRouter = typeof appRouter;
