import type { Prisma } from '@prisma/client';
import { Layer } from 'effect';

import { DatabaseLayerContext } from '../layer/database.layer';

import type { DocumentInput } from './documents/persist-document.db';
import { persistDocument } from './documents/persist-document.db';
import { prisma } from './internal/prisma.instance';
import { tryQuery } from './internal/try-query.effect';
import { findUserByEmail } from './users/findUserByEmail.db';

export const PrismaDatabaseLayerLive = Layer.succeed(
  DatabaseLayerContext,
  DatabaseLayerContext.of({
    disconnect: () =>
      tryQuery(prisma.$disconnect() as Prisma.PrismaPromise<void>),
    // -----------------------------------------------------------------------
    // Users
    findUserByEmail: (email: string | null) => findUserByEmail(email),
    // -----------------------------------------------------------------------
    // Documents
    persistDocument: (data: DocumentInput) => persistDocument(data),
    // -----------------------------------------------------------------------
    //
  }),
);
