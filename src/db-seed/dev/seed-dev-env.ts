import { Effect } from 'effect';

import { createAssets } from './../common-datasets/assets/create-assets.task';

export const seedDevEnv = () =>
  Effect.gen(function* (_) {
    console.info('💾 Seeding database with development dataset.');

    yield* _(
      Effect.all([
        createAssets(),
        //...
      ]),
    );
  });
