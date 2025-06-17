import { serverConfig } from './config';
import { createServer } from './server';

export type { AppRouter } from './router';

const server = createServer(serverConfig);

void server.start();
