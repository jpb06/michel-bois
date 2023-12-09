import { Effect } from 'effect';
import { glob } from 'glob';

export const getFolderFiles = (path: string) =>
  Effect.tryPromise(() =>
    glob(path, {
      cwd: __dirname,
      nodir: true,
    }),
  );
