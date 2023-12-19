import { Effect } from 'effect';

import { sessionStorage } from './session-storage.server';

export const getSession = (request: Request) =>
  Effect.gen(function* (_) {
    const cookie = request.headers.get('Cookie');

    return yield* _(Effect.tryPromise(() => sessionStorage.getSession(cookie)));
  });
