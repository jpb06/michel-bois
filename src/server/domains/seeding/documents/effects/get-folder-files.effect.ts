import { Effect } from 'effect';
import { glob } from 'glob';

import { GlobError } from '@errors';

export const getFolderFiles = (path: string) =>
  Effect.tryPromise({
    try: () =>
      glob(path, {
        cwd: __dirname,
        nodir: true,
      }),
    catch: (e) => GlobError.from(e),
  });
