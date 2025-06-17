import { ServerOptions } from './server';

export const serverConfig: ServerOptions = {
  dev: process.env.SERVER_DEV ? Boolean(process.env.SERVER_DEV === 'true') : true,
  host: process.env.SERVER_HOST,
  port: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT, 10) : 3001,
  prefix: process.env.SERVER_PREFIX,
};
