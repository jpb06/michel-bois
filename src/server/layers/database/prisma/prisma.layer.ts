import type { Prisma } from '@prisma/client';
import { Layer } from 'effect';

import { UserId } from '@common/types';

import { DatabaseLayerContext } from '../layer/database.layer';

import { getDocuments } from './documents/get-documents.db';
import type { PersistDocumentInput } from './documents/persist-document.db';
import { persistDocument } from './documents/persist-document.db';
import { prisma } from './internal/prisma.instance';
import { tryQuery } from './internal/try-query.effect';
import { countUsers } from './users/countUsers.db';
import { findUserByEmail } from './users/findUserByEmail.db';
import { findUserById } from './users/findUserById.db';
import { persistPassword } from './users/persistPassword.db';
import { PersistUserInput, persistUser } from './users/persistUser.db';

export const PrismaDatabaseLayerLive = Layer.succeed(
  DatabaseLayerContext,
  DatabaseLayerContext.of({
    disconnect: () =>
      tryQuery(prisma.$disconnect() as Prisma.PrismaPromise<void>),
    // -----------------------------------------------------------------------
    // Users
    persistUser: (data: PersistUserInput) => persistUser(data),
    persistPassword: (userId: UserId, hash: string) =>
      persistPassword(userId, hash),
    findUserById: (id: UserId) => findUserById(id),
    findUserByEmail: (email: string) => findUserByEmail(email),
    countUsers: () => countUsers(),
    // -----------------------------------------------------------------------
    // Documents
    getDocuments: () => getDocuments(),
    persistDocument: (data: PersistDocumentInput) => persistDocument(data),
    // -----------------------------------------------------------------------
    //
  }),
);
