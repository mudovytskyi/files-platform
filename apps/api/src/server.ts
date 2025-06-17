import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import Fastify from 'fastify';
import { appRouter } from './router';
import { createContext } from './router/context';

export interface ServerOptions {
  dev?: boolean;
  host?: string;
  port?: number;
  prefix?: string;
}

export function createServer(opts: ServerOptions) {
  const dev = opts.dev ?? true;
  const port = opts.port ?? 3001;
  const prefix = opts.prefix ?? '/trpc';
  const host = opts.host ?? '0.0.0.0';

  const server = Fastify({
    disableRequestLogging: !dev,
    trustProxy: true,
    logger: dev && {
      level: 'info',
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    },
  });

  void server.setErrorHandler((error, request, reply) => {
    request.log.error(error);
    reply.status(500).send({ error: 'Внутрішня помилка сервера' });
  });

  void server.register(fastifyTRPCPlugin, {
    prefix,
    trpcOptions: {
      router: appRouter,
      createContext,
    },
  });

  server.get('/', async () => {
    return { hello: 'wait-on 💨' };
  });

  const stop = async () => {
    await server.close();
  };
  const start = async () => {
    try {
      await server.listen({ port, host });
      console.log(`Server running at http://${host}:${port}`);
    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  };

  return { server, start, stop };
}
