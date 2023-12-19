import { Effect } from 'effect';

import { createDocuments } from '../common-datasets/documents/create-documents.task';
import { createUsers } from '../common-datasets/users/create-users.task';

export const seedDevEnv = () =>
  Effect.gen(function* (_) {
    console.info('💾 Seeding database with development dataset.');

    yield* _(
      Effect.all([
        createUsers(),
        createDocuments(),
        //...
      ]),
    );
  });
