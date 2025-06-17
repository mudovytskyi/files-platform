import { z } from 'zod';

export const FileSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  url: z.string().url(),
  createdAt: z.date().transform((date) => date.toISOString()),
});

export const UploadFileSchema = z.object({
  name: z.string().min(1),
  // Рядок файлу має бути у форматі base64
  file: z.string(),
});

export const DeleteFileSchema = z.object({
  id: z.string(),
});

export type FilePlatform = z.infer<typeof FileSchema>;
export type UploadFilePlatform = z.infer<typeof UploadFileSchema>;
export type DeleteFilePlatform = z.infer<typeof DeleteFileSchema>;
