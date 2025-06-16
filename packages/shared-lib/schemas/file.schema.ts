import { z } from 'zod';

export const FileSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  url: z.string().url(),
  createdAt: z.date(),
});

export const UploadFileSchema = z.object({
  name: z.string().min(1),
  // Рядок файлу має бути у форматі base64
  file: z.string(),
});

export type FilePlatform = z.infer<typeof FileSchema>;
export type UploadFilePlatform = z.infer<typeof UploadFileSchema>;
