import { UserId } from '@common/types';

import { prisma, tryQuery } from '../internal';

export const persistPassword = (userId: UserId, hash: string) =>
  tryQuery(
    prisma.password.create({
      data: {
        idUser: userId,
        hash,
      },
    }),
  );
