import { FileSchema } from '@file-platform/shared-lib';
import { prismaClient } from '../../prisma';

export const getFilesHandler = async () => {
  const files = await prismaClient.file.findMany();
  return files.map((file) => FileSchema.parse(file));
};
