import { publicProcedure, router } from '../trpc';
import { DeleteFileSchema, UploadFileSchema } from '@file-platform/shared-lib';
import { deleteFileHandler } from '../handlers/deleteFile.handler';
import { uploadFileHandler } from '../handlers/uploadFile.handler';

export const postsRouter = router({
  deleteFile: publicProcedure.input(DeleteFileSchema).mutation(deleteFileHandler),
  uploadFile: publicProcedure.input(UploadFileSchema).mutation(uploadFileHandler),
});
