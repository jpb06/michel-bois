import { UserId } from '@common/types';

import { prisma, tryQuery } from '../internal';

export const findUserById = (id: UserId) =>
  tryQuery(
    prisma.user.findFirst({
      where: {
        id,
      },
    }),
  );
