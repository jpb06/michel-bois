import { Effect } from 'effect';

import { DatabaseLayer } from '@layers';

interface CreateUserTaskArgs {
  name: string;
  email: string;
  password: string;
}

export const createUserTask = ({ name, email, password }: CreateUserTaskArgs) =>
  Effect.gen(function* (_) {
    const user = yield* _(
      DatabaseLayer.users.persistUser({
        name,
        email,
        emailVerified: false,
      }),
    );
    yield* _(DatabaseLayer.users.persistPassword(user.id, password));

    return user;
  });
