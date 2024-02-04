import { Effect } from 'effect';

import { SessionError } from '@errors';

import { sessionStorage } from './session-storage.server';

export const getSession = (request: Request) =>
  Effect.gen(function* (_) {
    const cookie = request.headers.get('Cookie');

    return yield* _(
      Effect.tryPromise({
        try: () => sessionStorage.getSession(cookie),
        catch: (e) => SessionError.from(e),
      }),
    );
  });
