import type { Effect } from 'effect';
import { Context } from 'effect';

import { UserId } from '@common/types';

import { tapLayer } from '../../effects/tapLayer.effect';
import { getDocuments } from '../prisma/documents/get-documents.db';
import type {
  PersistDocumentInput,
  persistDocument,
} from '../prisma/documents/persist-document.db';
import type { DbError } from '../prisma/internal/try-query.effect';
import { countUsers } from '../prisma/users/countUsers.db';
import { findUserByEmail } from '../prisma/users/findUserByEmail.db';
import { findUserById } from '../prisma/users/findUserById.db';
import { persistPassword } from '../prisma/users/persistPassword.db';
import { PersistUserInput, persistUser } from '../prisma/users/persistUser.db';

export interface Database {
  disconnect: () => Effect.Effect<never, DbError, void>;
  // users
  persistUser: typeof persistUser;
  persistPassword: typeof persistPassword;
  findUserById: typeof findUserById;
  findUserByEmail: typeof findUserByEmail;
  countUsers: typeof countUsers;
  // documents
  getDocuments: typeof getDocuments;
  persistDocument: typeof persistDocument;
  //
}

export const DatabaseLayerContext = Context.Tag<Database>();

export const DatabaseLayer = {
  disconnect: () => tapLayer(DatabaseLayerContext, (db) => db.disconnect()),
  // -----------------------------------------------------------------------
  users: {
    create: (data: PersistUserInput) =>
      tapLayer(DatabaseLayerContext, (db) => db.persistUser(data)),
    setPassword: (userId: UserId, hash: string) =>
      tapLayer(DatabaseLayerContext, (db) => db.persistPassword(userId, hash)),
    findById: (id: UserId) =>
      tapLayer(DatabaseLayerContext, (db) => db.findUserById(id)),
    findByEmail: (email: string) =>
      tapLayer(DatabaseLayerContext, (db) => db.findUserByEmail(email)),
    count: () => tapLayer(DatabaseLayerContext, (db) => db.countUsers()),
  },
  // -----------------------------------------------------------------------
  documents: {
    get: () => tapLayer(DatabaseLayerContext, (db) => db.getDocuments()),
    create: (data: PersistDocumentInput) =>
      tapLayer(DatabaseLayerContext, (db) => db.persistDocument(data)),
  },
  // -----------------------------------------------------------------------
};
