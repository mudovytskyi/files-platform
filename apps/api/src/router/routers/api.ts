import { publicProcedure, router } from '../trpc';
import { getFilesHandler } from '../handlers/getFiles.handler';

export const apiRouter = router({
  getFiles: publicProcedure.query(getFilesHandler),
});
