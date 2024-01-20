import type { Effect } from 'effect';
import { Context } from 'effect';

import { UserId } from 'common/zod.types';

import { tapLayer } from '../../effects/tapLayer.effect';
import type {
  DocumentInput,
  persistDocument,
} from '../prisma/documents/persist-document.db';
import type { DbError } from '../prisma/internal/try-query.effect';
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
  // documents
  persistDocument: typeof persistDocument;
  //
}

export const DatabaseLayerContext = Context.Tag<Database>();

export const DatabaseLayer = {
  disconnect: () => tapLayer(DatabaseLayerContext, (db) => db.disconnect()),
  // -----------------------------------------------------------------------
  users: {
    persistUser: (data: PersistUserInput) =>
      tapLayer(DatabaseLayerContext, (db) => db.persistUser(data)),
    persistPassword: (userId: UserId, hash: string) =>
      tapLayer(DatabaseLayerContext, (db) => db.persistPassword(userId, hash)),
    findById: (id: UserId) =>
      tapLayer(DatabaseLayerContext, (db) => db.findUserById(id)),
    findByEmail: (email: string) =>
      tapLayer(DatabaseLayerContext, (db) => db.findUserByEmail(email)),
  },
  // -----------------------------------------------------------------------
  documents: {
    persist: (data: DocumentInput) =>
      tapLayer(DatabaseLayerContext, (db) => db.persistDocument(data)),
  },
  // -----------------------------------------------------------------------
};
