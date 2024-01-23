import { Effect } from 'effect';

import { hash } from '@domains/auth';
import { DatabaseLayer } from '@layers';
import { PersistUserInput } from '@layers/types';

interface CreateUserInput extends PersistUserInput {
  password: string;
}

export const createUserTask = ({ password, ...data }: CreateUserInput) =>
  Effect.gen(function* (_) {
    const user = yield* _(DatabaseLayer.users.create(data));
    const hashedPassword = yield* _(hash(password));

    yield* _(DatabaseLayer.users.setPassword(user.id, hashedPassword));

    return user;
  });
