import { Client } from 'minio';

export function createMinioClient() {
  console.log('minio +');
  return new Client({
    endPoint: process.env.MINIO_ENDPOINT || 'localhost',
    port: Number(process.env.MINIO_PORT) || 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
    secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
  });
}

export const BUCKET_NAME = process.env.MINIO_BUCKET_NAME ?? 'files';
export const FILE_SIGNED_URL_EXPIRED_IN = 7 * 24 * 60 * 60;
export const minioClient = createMinioClient();
