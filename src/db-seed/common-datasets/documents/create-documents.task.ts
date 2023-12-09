import { Effect } from 'effect';

import { failIfOrphansFound } from './effects/fail-if-orphans-found.effect';
import { getFolderFiles } from './effects/get-folder-files.effect';
import { integrateDocument } from './effects/integrate-item/integrate-document.effect';

export const createDocuments = () =>
  Effect.gen(function* (_) {
    const files = yield* _(getFolderFiles('./../data/img/*.*'));

    yield* _(failIfOrphansFound(files));

    yield* _(
      Effect.forEach(files, integrateDocument, {
        concurrency: 5,
      }),
    );
  });
