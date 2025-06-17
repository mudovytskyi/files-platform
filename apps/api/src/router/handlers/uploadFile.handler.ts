import { BUCKET_NAME, FILE_SIGNED_URL_EXPIRED_IN, minioClient } from '../../minio';
import { FilePlatform, FileSchema, UploadFilePlatform } from '@file-platform/shared-lib';
import { prismaClient } from '../../prisma';
import { KafkaService } from '../../kafka';

// @ts-ignore
export const uploadFileHandler = async ({
  input,
}: {
  input: UploadFilePlatform;
}): Promise<FilePlatform> => {
  const { name, file } = input;
  if (!file) {
    throw new Error("File wasn't found");
  }

  // Декодуємо base64 у бінарні дані
  // Видаляємо префікс base64 (напр. "data:image/jpeg;base64,") якщо він існує
  const base64Data = file.includes('base64,') ? file.split('base64,')[1] : file;
  const fileBuffer = Buffer.from(base64Data, 'base64');

  // Завантаження до MinIO
  await minioClient.putObject(BUCKET_NAME, name, fileBuffer);

  // Отримання URL
  const url = await minioClient.presignedGetObject(BUCKET_NAME, name, FILE_SIGNED_URL_EXPIRED_IN);

  const savedFile = await prismaClient.file.create({
    data: {
      name,
      url,
    },
  });

  const validatedFile = FileSchema.parse(savedFile);

  // Публікація події в Kafka
  const kafkaService = await KafkaService.getInstance();
  await kafkaService.publishFileUploaded(validatedFile);

  return validatedFile;
};
