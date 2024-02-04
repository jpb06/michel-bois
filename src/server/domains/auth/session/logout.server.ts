import { redirect } from '@remix-run/server-runtime';
import { Effect } from 'effect';

import { SessionError } from '@errors';

import { getSession } from './get-session.server';
import { sessionStorage } from './session-storage.server';

export const logout = (request: Request) =>
  Effect.gen(function* (_) {
    const session = yield* _(getSession(request));

    const cookie = yield* _(
      Effect.tryPromise({
        try: () => sessionStorage.destroySession(session),
        catch: (e) => SessionError.from(e),
      }),
    );

    return redirect('/', {
      headers: {
        'Set-Cookie': cookie,
      },
    });
  });
