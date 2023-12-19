import { Effect } from 'effect';

import { DatabaseLayer } from '@layers';

import { getUserId } from './get-user-id.server';
import { logout } from './logout.server';

export const getUser = (request: Request) =>
  Effect.gen(function* (_) {
    const userId = yield* _(getUserId(request));
    if (userId === undefined) {
      return null;
    }

    const user = yield* _(DatabaseLayer.users.findById(userId));
    if (user) {
      return user;
    }

    yield* _(logout(request));
  });
