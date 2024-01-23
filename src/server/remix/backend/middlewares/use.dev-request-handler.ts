import { createRequestHandler } from '@remix-run/express';
import { ServerBuild } from '@remix-run/node';
import type { Express } from 'express';

import { createDevRequestHandler } from '../logic/create-dev-request-handler.logic';

export const useDevRequestHandler = async (
  app: Express,
  initialBuild: ServerBuild,
) => {
  const remixHandler =
    process.env.NODE_ENV === 'development'
      ? await createDevRequestHandler(initialBuild)
      : createRequestHandler({
          build: initialBuild,
          mode: initialBuild.mode,
        });

  app.all('*', remixHandler);
};
