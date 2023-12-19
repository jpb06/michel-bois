import { Effect } from 'effect';

import { UserId } from 'common/types';

import { userSessionKey } from './constants/user-session-key.constant';
import { getSession } from './get-session.server';

export const getUserId = (request: Request) =>
  Effect.gen(function* (_) {
    const session = yield* _(getSession(request));

    const userId = session.get(userSessionKey);

    return userId as UserId | undefined;
  });
