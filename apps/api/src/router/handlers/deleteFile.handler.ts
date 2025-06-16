import { prismaClient } from '../../prisma';
import { BUCKET_NAME, minioClient } from '../../minio';

// @ts-ignore
export const deleteFileHandler = async ({ input }) => {
  const { id } = input;
  const file = await prismaClient.file.findUnique({ where: { id } });
  if (!file) throw new Error('File not found');

  await minioClient.removeObject(BUCKET_NAME, file.name);

  await prismaClient.file.delete({ where: { id } });

  return { success: true };
};
