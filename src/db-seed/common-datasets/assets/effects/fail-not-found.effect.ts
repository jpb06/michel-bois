import { Effect } from 'effect';

import { SeedError } from 'db-seed/errors/seed-error';

export const failNotFound = (filePath: string) =>
  Effect.fail(
    SeedError.new(
      'asset-not-found-in-seed-data',
      `Asset ${filePath} not found in assetsSeedData`,
    ),
  );
