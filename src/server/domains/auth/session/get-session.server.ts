import { Effect } from 'effect';

import { tryPromise } from '@effects';

import { sessionStorage } from './session-storage.server';

export const getSession = (request: Request) =>
  Effect.gen(function* (_) {
    const cookie = request.headers.get('Cookie');

    return yield* _(
      tryPromise(sessionStorage.getSession(cookie), 'SessionStorageError'),
    );
  });
