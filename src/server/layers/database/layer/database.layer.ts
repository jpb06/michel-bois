import type { Effect } from 'effect';
import { Context } from 'effect';

import type {
  DocumentInput,
  persistDocument,
} from '../prisma/documents/persist-document.db';
import type { DbError } from '../prisma/internal/try-query.effect';
import { findUserByEmail } from '../prisma/users/findUserByEmail.db';

import { tapLayer } from './../../tapLayer.effect';

export interface Database {
  disconnect: () => Effect.Effect<never, DbError, void>;
  // users
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
    findByEmail: (email: string | null) =>
      tapLayer(DatabaseLayerContext, (db) => db.findUserByEmail(email)),
  },
  // -----------------------------------------------------------------------
  documents: {
    persist: (data: DocumentInput) =>
      tapLayer(DatabaseLayerContext, (db) => db.persistDocument(data)),
  },
  // -----------------------------------------------------------------------
};
