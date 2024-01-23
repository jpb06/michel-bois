import path from 'path';

import type { RequestHandler } from '@remix-run/express';
import { createRequestHandler } from '@remix-run/express';
import type { ServerBuild } from '@remix-run/node';
import { broadcastDevReady } from '@remix-run/node';

import { reimportServer } from './reimport-server.logic';

export const createDevRequestHandler = async (
  initialBuild: ServerBuild,
): Promise<RequestHandler> => {
  const versionPath = path.resolve('./build/version.txt');

  let build = initialBuild;

  async function handleServerUpdate() {
    // 1. re-import the server build
    build = await reimportServer();
    // 2. tell Remix that this app server is now up-to-date and ready
    await broadcastDevReady(build);
  }

  const chokidar = await import('chokidar');
  chokidar
    .watch(versionPath, { ignoreInitial: true })
    .on('add', handleServerUpdate)
    .on('change', handleServerUpdate);

  // wrap request handler to make sure its recreated with the latest build for every request
  return async (req, res, next) => {
    try {
      return createRequestHandler({
        build,
        mode: 'development',
      })(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
