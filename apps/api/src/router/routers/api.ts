import { publicProcedure, router } from '../trpc';
import { getFilesHandler } from '../handlers/get-files.handler';

export const apiRouter = router({
  getFiles: publicProcedure.query(getFilesHandler),
});
