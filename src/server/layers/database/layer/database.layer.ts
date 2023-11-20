import type { Effect } from 'effect';
import { Context } from 'effect';

import type {
  AssetInput,
  persistAsset,
} from '../prisma/assets/persist-asset.db';
import type { DbError } from '../prisma/try-query.effect';

import { tapLayer } from './../../tapLayer.effect';

export interface Database {
  disconnect: () => Effect.Effect<never, DbError, void>;
  persistAsset: typeof persistAsset;
}

export const DatabaseLayerContext = Context.Tag<Database>();

export const DatabaseLayer = {
  disconnect: () => tapLayer(DatabaseLayerContext, (db) => db.disconnect()),
  assets: {
    persist: (data: AssetInput) =>
      tapLayer(DatabaseLayerContext, (db) => db.persistAsset(data)),
  },
};
