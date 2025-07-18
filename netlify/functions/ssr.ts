import { createHandler } from '@netlify/angular-runtime';

export const handler = createHandler({
  appPath: 'dist/chats-micro-services/server/entry.netlify',
});
