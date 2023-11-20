import { Effect } from 'effect';

import { failIfOrphansFound } from './effects/fail-if-orphans-found.effect';
import { getFolderFiles } from './effects/get-folder-files.effect';
import { integrateAsset } from './effects/integrate-item/integrate-asset.effect';

export const createAssets = () =>
  Effect.gen(function* (_) {
    const files = yield* _(getFolderFiles('./../data/img/*.*'));

    yield* _(failIfOrphansFound(files));

    yield* _(
      Effect.forEach(files, integrateAsset, {
        concurrency: 5,
      }),
    );
  });
