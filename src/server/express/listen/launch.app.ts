import { ServerBuild, broadcastDevReady } from '@remix-run/node';
import type { Express } from 'express';

export const launchApp = (app: Express, initialBuild: ServerBuild) => {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`✅ app ready: http://localhost:${port}`);

    if (process.env.NODE_ENV === 'development') {
      broadcastDevReady(initialBuild);
    }
  });
};
