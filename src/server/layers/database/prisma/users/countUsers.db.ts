import { prisma, tryQuery } from '../internal';

export const countUsers = () => tryQuery(prisma.user.count());
