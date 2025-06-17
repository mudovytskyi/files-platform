import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@file-platform/api';

export const trpc = createTRPCReact<AppRouter>();
