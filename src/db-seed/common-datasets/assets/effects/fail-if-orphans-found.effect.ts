import { Effect } from 'effect';

import { SeedError } from 'db-seed/errors/seed-error';

import { assetsSeedData } from '../data/assets.data';

const getOrphans = (files: string[]) =>
  files.filter(
    (path) => !assetsSeedData.some(({ fileName }) => path.endsWith(fileName)),
  );

const getErrorMessage = (orphans: string[]) =>
  `Missing seed data for files: ${orphans
    .map((path) => `\n- ${path.substring(path.lastIndexOf('/') + 1)}`)
    .join('')}`;

export const failIfOrphansFound = (files: string[]) =>
  Effect.gen(function* (_) {
    const orphans = getOrphans(files);
    if (orphans.length > 0) {
      return yield* _(
        Effect.fail(SeedError.new('orphans-found', getErrorMessage(orphans))),
      );
    }
  });
