// learn more: https://fly.io/docs/reference/configuration/#services-http_checks
import { Effect, pipe } from 'effect';

import { effectLoader } from '@effects';
import { DatabaseLayer, PrismaDatabaseLayerLive } from '@layers';

import { fetchRoot } from './effects/fetchRoot';
import { getRootUrl } from './logic/getRootUrl.logic';

export const loader = effectLoader((request) =>
  pipe(
    Effect.sync(() => getRootUrl(request)),
    Effect.flatMap((url) =>
      Effect.all([DatabaseLayer.users.count(), fetchRoot(url)], {
        concurrency: 'unbounded',
      }),
    ),
    Effect.map(() => new Response('OK', { status: 200 })),
    Effect.catchAll((error) => {
      console.error('healthcheck ❌', { error });

      return Effect.succeed(new Response('ERROR', { status: 500 }));
    }),
    Effect.provide(PrismaDatabaseLayerLive),
  ),
);
