import { hash } from 'argon2';
import { Effect } from 'effect';

import { DatabaseLayer } from '@layers';

import { SeededUserData } from '../data/users.data';

export const createUser = ({ password, ...data }: SeededUserData) =>
  Effect.gen(function* (_) {
    const user = yield* _(DatabaseLayer.users.create(data));

    const hashedPassword = yield* _(Effect.tryPromise(() => hash(password)));

    yield* _(DatabaseLayer.users.setPassword(user.id, hashedPassword));
  });
