import { Effect } from 'effect';

import { usersData } from './data/users.data';
import { createUser } from './effects/create-user.effect';

export const createUsers = () =>
  Effect.gen(function* (_) {
    yield* _(
      Effect.forEach(usersData, createUser, {
        concurrency: 5,
      }),
    );
  });
