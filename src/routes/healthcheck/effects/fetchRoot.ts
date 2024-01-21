import { Effect, pipe } from 'effect';

export const fetchRoot = (url: URL) =>
  pipe(
    Effect.tryPromise(() => fetch(url.toString(), { method: 'HEAD' })),
    Effect.flatMap((r) => {
      if (!r.ok) {
        return Effect.fail(r);
      }

      return Effect.succeed(r);
    }),
  );
