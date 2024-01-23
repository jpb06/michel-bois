import { Effect } from 'effect';

import { AppError } from '../../../../errors/application-error';
import { documentsSeedData } from '../data/documents.data';

const getOrphans = (files: string[]) =>
  files.filter(
    (path) =>
      !documentsSeedData.some(({ fileName }) => path.endsWith(fileName)),
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
        Effect.fail(
          AppError.new('SeedDocumentOrphanFound', getErrorMessage(orphans)),
        ),
      );
    }
  });
