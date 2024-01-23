import { redirect } from '@remix-run/node';
import { Effect } from 'effect';

import { tryPromise } from '@effects';

import { userSessionKey } from './constants/user-session-key.constant';
import { getSession } from './get-session.server';
import { sessionStorage } from './session-storage.server';

interface CreateUserSessionInput {
  request: Request;
  userId: string;
  redirectTo: string;
}

export const createUserSession = ({
  request,
  userId,
  redirectTo,
}: CreateUserSessionInput) =>
  Effect.gen(function* (_) {
    const session = yield* _(getSession(request));
    session.set(userSessionKey, userId);

    const cookie = yield* _(
      tryPromise(
        sessionStorage.commitSession(session, {
          maxAge: 60 * 60 * 24 * 7,
        }),
        'SessionStorageError',
      ),
    );

    return redirect(redirectTo, {
      headers: {
        'Set-Cookie': cookie,
      },
    });
  });
