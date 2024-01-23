import { Effect } from 'effect';

import { createUserTask } from '@domains/users';

import { usersData } from './data/users.data';

export const seedUsersTask = () =>
  Effect.gen(function* (_) {
    yield* _(
      Effect.forEach(usersData, createUserTask, {
        concurrency: 5,
      }),
    );
  });
