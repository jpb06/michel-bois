import dotenv from 'dotenv-flow';
import { Effect, Layer, pipe } from 'effect';

dotenv.config({
  silent: true,
});

import { displaySeedErrors, seedDevEnv } from '@data-seeding';
import {
  DatabaseLayer,
  PrismaDatabaseLayerLive,
  R2FileStorageLayerLive,
} from '@layers';

const task = pipe(
  seedDevEnv(),
  Effect.flatMap(DatabaseLayer.disconnect),
  Effect.provide(Layer.merge(PrismaDatabaseLayerLive, R2FileStorageLayerLive)),
);

Effect.runPromise(task).catch((error) => {
  displaySeedErrors(error);
});
