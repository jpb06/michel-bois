import type { Prisma } from '@prisma/client';
import { Layer } from 'effect';

import { DatabaseLayerContext } from '../layer/database.layer';

import type { AssetInput } from './assets/persist-asset.db';
import { persistAsset } from './assets/persist-asset.db';
import { prisma } from './prisma.instance';
import { tryQuery } from './try-query.effect';

export const PrismaDatabaseLayerLive = Layer.succeed(
  DatabaseLayerContext,
  DatabaseLayerContext.of({
    disconnect: () =>
      tryQuery(prisma.$disconnect() as Prisma.PrismaPromise<void>),
    persistAsset: (data: AssetInput) => persistAsset(data),
  }),
);
