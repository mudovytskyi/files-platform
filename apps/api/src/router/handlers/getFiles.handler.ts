import { FilePlatform, FileSchema } from '@file-platform/shared-lib';
import { prismaClient } from '../../prisma';

export const getFilesHandler = async (): Promise<FilePlatform[]> => {
  const files = await prismaClient.file.findMany();
  return files.map((file) => FileSchema.parse(file));
};
