import { Effect, pipe } from 'effect';

import { tryPromise } from '@effects';

export const fetchRoot = (url: URL) =>
  pipe(
    tryPromise(fetch(url.toString(), { method: 'HEAD' }), 'FetchError'),
    Effect.flatMap((r) => {
      if (!r.ok) {
        return Effect.fail(r);
      }

      return Effect.succeed(r);
    }),
  );
