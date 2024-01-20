import { UserId } from 'common/zod.types';

import { prisma, tryQuery } from '../internal';

export const findUserById = (id: UserId) =>
  tryQuery(
    prisma.user.findFirst({
      where: {
        id,
      },
    }),
  );
