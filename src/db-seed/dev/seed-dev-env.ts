import { Effect } from 'effect';

import { createDocuments } from '../common-datasets/documents/create-documents.task';

export const seedDevEnv = () =>
  Effect.gen(function* (_) {
    console.info('💾 Seeding database with development dataset.');

    yield* _(
      Effect.all([
        createDocuments(),
        //...
      ]),
    );
  });
