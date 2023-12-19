import { prisma, tryQuery } from '../internal';

export const findUserByEmail = (email: string) =>
  tryQuery(
    prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        password: true,
      },
    }),
  );
