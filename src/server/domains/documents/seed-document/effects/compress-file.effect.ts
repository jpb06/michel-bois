import path from 'path';

import { Effect } from 'effect';
import { readFile } from 'fs-extra';
import sharp from 'sharp';

import { tryPromise } from '@effects';

export const compressFile = (fileName: string) =>
  Effect.gen(function* (_) {
    const filePath = path.join(
      __dirname,
      `./../../../seeding/documents/data/img/${fileName}`,
    );

    const data = yield* _(tryPromise(readFile(filePath), 'SeedFileNotFound'));

    const sharpImage = sharp(data)
      .resize({
        width: 800,
      })
      .jpeg({ mozjpeg: true, quality: 75 });

    return yield* _(
      Effect.all(
        [
          tryPromise(sharpImage.toBuffer(), 'SharpError'),
          tryPromise(sharpImage.metadata(), 'SharpError'),
        ],
        { concurrency: 'unbounded' },
      ),
    );
  });
