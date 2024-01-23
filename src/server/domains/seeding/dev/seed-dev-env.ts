import { Effect } from 'effect';

import { seedDocumentsTask } from '../documents/seed-documents.task';
import { seedUsersTask } from '../users/seed-users.task';

export const seedDevEnv = () =>
  Effect.gen(function* (_) {
    console.info('💾 Seeding database with development dataset.');

    yield* _(
      Effect.all([
        seedUsersTask(),
        seedDocumentsTask(),
        //...
      ]),
    );
  });
