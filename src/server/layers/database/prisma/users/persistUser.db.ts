import { Effect } from 'effect';

import { UserId } from 'common/zod.types';

import { prisma, tryQuery } from '../internal';

export interface PersistUserInput {
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
}

export const persistUser = (data: PersistUserInput) =>
  Effect.gen(function* (_) {
    const user = yield* _(
      tryQuery(
        prisma.user.create({
          data,
        }),
      ),
    );

    return {
      ...user,
      id: user.id as UserId,
    };
  });
