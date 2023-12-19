import { Effect } from 'effect';

import { SeedError } from '../../../errors/seed-error';

export const failNotFound = (filePath: string) =>
  Effect.fail(
    SeedError.new(
      'document-not-found-in-seed-data',
      `Document ${filePath} not found in documentsSeedData`,
    ),
  );
