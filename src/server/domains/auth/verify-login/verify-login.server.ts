import { Effect } from 'effect';

import { DatabaseLayer } from '@layers';

import { validatePassword } from '../password/validate-password.server';

export const verifyLoginTask = (email: string, password: string) =>
  Effect.gen(function* (_) {
    const userWithPassword = yield* _(DatabaseLayer.users.findByEmail(email));
    if (!userWithPassword || !userWithPassword.password) {
      return null;
    }

    const isValid = yield* _(
      validatePassword(userWithPassword!.password.hash, password),
    );

    if (!isValid) {
      return null;
    }

    const { password: _password, ...userWithoutPassword } = userWithPassword;

    return userWithoutPassword;
  });
