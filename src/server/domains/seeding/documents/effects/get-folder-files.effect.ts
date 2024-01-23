import { glob } from 'glob';

import { tryPromise } from '@effects';

export const getFolderFiles = (path: string) =>
  tryPromise(
    glob(path, {
      cwd: __dirname,
      nodir: true,
    }),
    'GlobError',
  );
