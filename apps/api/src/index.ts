// import { KafkaService } from './kafka';
// import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
// import multipart, { MultipartFile } from '@fastify/multipart';
// import { Client } from 'minio';
// import { inferRouterInputs, inferRouterOutputs, initTRPC } from '@trpc/server';
// import { z } from 'zod';
// import Fastify, { FastifyInstance, FastifyRequest } from 'fastify';
// import { FileSchema, UploadFileSchema } from '@file-platform/shared-lib';
// import { PrismaClient } from '@prisma/client';
//
// const prisma = new PrismaClient({
//   log: [ 'query', 'info', 'warn', 'error' ]
// });
//
// const minioClient = new Client({
//   endPoint: process.env.MINIO_ENDPOINT || 'localhost',
//   port: Number(process.env.MINIO_PORT) || 9000,
//   useSSL: false,
//   accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
//   secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin'
// });
//
// let kafkaService: KafkaService;
//
// type CreateContextOptions = {
//   req: FastifyRequest;
// };
//
// interface FileRequest extends MultipartFile {
//   toBuffer: () => Promise<Buffer>;
// }
//
// const createContext = async ({ req }: CreateContextOptions) => {
//   console.log('Fire context');
//   // const files = await req.files();
//   const file = await req.file();
//   return {
//     req,
//     // files: files as AsyncIterableIterator<FileRequest>
//     file: file as MultipartFile
//   };
// };
//
// type Context = Awaited<ReturnType<typeof createContext>>;
//
//
// const t = initTRPC.context<Context>().create();
//
// const appRouter = t.router({
//   uploadFile: t.procedure
//     .input(UploadFileSchema)
//     .mutation(async ({ input, ctx }) => {
//       const { name } = input;
//
//       // const fileData = await ctx.files.next();
//       const fileData = ctx.file;
//       // if (!fileData || fileData.done) {
//       if (!fileData) {
//         throw new Error('File wasn\'t found');
//       }
//
//       // const file = await fileData.value.toBuffer();
//       const file = await fileData.toBuffer();
//
//
//       // Upload to MinIO
//       const bucketName = 'files';
//
//       await minioClient.putObject(bucketName, name, file);
//
//       // Get file URL
//       const url = await minioClient.presignedGetObject(
//         bucketName,
//         name,
//         7 * 24 * 60 * 60
//       );
//
//       const savedFile = await prisma.file.create({
//         data: {
//           name,
//           url
//         }
//       });
//
//       const validatedFile = FileSchema.parse(savedFile);
//
//       // Public event in Kafka
//       await kafkaService.publishFileUploaded(validatedFile);
//
//       return validatedFile;
//     }),
//
//   getFiles: t.procedure
//     .query(async () => {
//       const files = await prisma.file.findMany();
//       return files.map((file) => FileSchema.parse(file));
//     }),
//
//   deleteFile: t.procedure
//     .input(z.string())
//     .mutation(async ({ input: id }) => {
//       const file = await prisma.file.findUnique({ where: { id } });
//       if (!file) throw new Error('File not found');
//
//       // Delete from MinIO
//       const bucketName = 'files';
//       await minioClient.removeObject(bucketName, file.name);
//
//       // Delete from database
//       await prisma.file.delete({ where: { id } });
//
//       return { success: true };
//     })
// });
//
// export type AppRouter = typeof appRouter;
//
// const createServer = (): FastifyInstance => {
//   return Fastify({
//     disableRequestLogging: true,
//     trustProxy: true,
//     logger: {
//       level: 'info',
//       transport: {
//         target: 'pino-pretty',
//         options: {
//           translateTime: 'HH:MM:ss Z',
//           ignore: 'pid,hostname'
//         }
//       }
//     }
//   });
// };
//
// export type RouterInput = inferRouterInputs<typeof appRouter>;
// export type RouterOutput = inferRouterOutputs<typeof appRouter>;
//
// const startServer = async () => {
//   const server = createServer();
//
//   server.setErrorHandler((error, request, reply) => {
//     request.log.error(error);
//     reply.status(500).send({ error: 'Внутрішня помилка сервера' });
//   });
//
//   await server.register(fastifyTRPCPlugin, {
//     prefix: '/trpc',
//     trpcOptions: {
//       router: appRouter,
//       createContext: async ({ req }: CreateContextOptions) => createContext({ req })
//     }
//   });
//
//   await server.register(multipart, {
//     limits: {
//       fileSize: 10_000_000, // 10MB
//       files: 1
//     }
//   });
//
//   try {
//     kafkaService = await KafkaService.getInstance();
//     const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
//     const host = '0.0.0.0';
//
//     await server.listen({ port, host });
//
//     console.log('Server running at http://localhost:3000');
//   } catch (err) {
//     server.log.error(err);
//     process.exit(1);
//   }
// };
//
// startServer();


import { KafkaService } from './kafka';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import { Client } from 'minio';
import { inferRouterInputs, inferRouterOutputs, initTRPC } from '@trpc/server';
import Fastify, { FastifyInstance, FastifyRequest } from 'fastify';
import { DeleteFileSchema, FileSchema, UploadFileSchema } from '@file-platform/shared-lib';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: [ 'query', 'info', 'warn', 'error' ]
});

const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: Number(process.env.MINIO_PORT) || 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
  secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin'
});

let kafkaService: KafkaService;

const createServer = (): FastifyInstance => {
  return Fastify({
    disableRequestLogging: true,
    trustProxy: true,
    logger: {
      level: 'info',
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname'
        }
      }
    }
  });
};


type Context = {
  req: FastifyRequest;
};

const t = initTRPC.context<Context>().create();

const appRouter = t.router({
  uploadFile: t.procedure
    .input(UploadFileSchema)
    .mutation(async ({ input }) => {
      const { file, name } = input;
      if (!file) {
        throw new Error('File wasn\'t found');
      }

      // Декодуємо base64 у бінарні дані
      // Видаляємо префікс base64 (напр. "data:image/jpeg;base64,") якщо він існує
      const base64Data = file.includes('base64,') ? file.split('base64,')[1] : file;
      const fileBuffer = Buffer.from(base64Data, 'base64');

      // Завантаження до MinIO
      const bucketName = 'files';
      await minioClient.putObject(bucketName, name, fileBuffer);

      // Отримання URL
      const url = await minioClient.presignedGetObject(bucketName, name, 7 * 24 * 60 * 60);

      const savedFile = await prisma.file.create({
        data: {
          name,
          url
        }
      });

      const validatedFile = FileSchema.parse(savedFile);

      // Публікація події в Kafka
      await kafkaService.publishFileUploaded(validatedFile);

      return validatedFile;
    }),

  getFiles: t.procedure.query(async () => {
    const files = await prisma.file.findMany();
    return files.map((file) => FileSchema.parse(file));
  }),

  deleteFile: t.procedure.input(DeleteFileSchema).mutation(async ({ input }) => {
    const { id } = input;
    const file = await prisma.file.findUnique({ where: { id } });
    if (!file) throw new Error('File not found');

    const bucketName = 'files';
    await minioClient.removeObject(bucketName, file.name);

    await prisma.file.delete({ where: { id } });

    return { success: true };
  })
});

export type AppRouter = typeof appRouter;
export type RouterInput = inferRouterInputs<typeof appRouter>;
export type RouterOutput = inferRouterOutputs<typeof appRouter>;

const startServer = async () => {
  const server = createServer();

  server.setErrorHandler((error, request, reply) => {
    request.log.error(error);
    reply.status(500).send({ error: 'Внутрішня помилка сервера' });
  });

  // Реєструємо multipart до tRPC
  // await server.register(multipart, {
  //   limits: {
  //     fileSize: 10_000_000, // 10MB
  //     files: 1
  //   }
  // });

  // Реєструємо tRPC
  await server.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: {
      router: appRouter,
      createContext: ({ req }: { req: FastifyRequest }) => ({ req })
    }
  });

  try {
    kafkaService = await KafkaService.getInstance();
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    const host = '0.0.0.0';

    await server.listen({ port, host });

    console.log('Server running at http://localhost:3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

startServer();