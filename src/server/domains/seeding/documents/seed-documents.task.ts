import { Effect } from 'effect';

import { seedDocument } from '@domains/documents';

import { failIfOrphansFound } from './effects/fail-if-orphans-found.effect';
import { getFolderFiles } from './effects/get-folder-files.effect';

export const seedDocumentsTask = () =>
  Effect.gen(function* (_) {
    const files = yield* _(getFolderFiles('./../data/img/*.*'));

    yield* _(failIfOrphansFound(files));

    yield* _(
      Effect.forEach(files, seedDocument, {
        concurrency: 5,
      }),
    );
  });
