import { Effect, pipe } from 'effect';

import { FetchError } from '@errors';

export const fetchRoot = (url: URL) =>
  pipe(
    Effect.tryPromise({
      try: () => fetch(url.toString(), { method: 'HEAD' }),
      catch: (e) => FetchError.from(e),
    }),
    Effect.flatMap((r) => {
      if (!r.ok) {
        return Effect.fail(r);
      }

      return Effect.succeed(r);
    }),
  );
