import dotenv from 'dotenv-flow';
import { Effect, Layer, pipe } from 'effect';

dotenv.config({
  silent: true,
});

import { displaySeedErrors, seedDevEnv } from '@db/seed';
import { DatabaseLayer, PrismaDatabaseLayerLive } from '@layers/database';
import { R2FileStorageLayerLive } from '@layers/file-storage';

const task = pipe(
  seedDevEnv(),
  Effect.flatMap(DatabaseLayer.disconnect),
  Effect.provide(Layer.merge(PrismaDatabaseLayerLive, R2FileStorageLayerLive)),
);

Effect.runPromise(task).catch((error) => {
  displaySeedErrors(error);
});
