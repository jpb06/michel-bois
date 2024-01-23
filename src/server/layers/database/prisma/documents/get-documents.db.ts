import { prisma, tryQuery } from '../internal';

export const getDocuments = () => tryQuery(prisma.document.findMany({}));
