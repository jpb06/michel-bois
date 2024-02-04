import path from 'path';

import { Effect } from 'effect';
import { readFile } from 'fs-extra';
import sharp from 'sharp';

import { SharpError, SeedError } from '@errors';

export const compressFile = (fileName: string) =>
  Effect.gen(function* (_) {
    const filePath = path.join(
      __dirname,
      `./../../../seeding/documents/data/img/${fileName}`,
    );

    const data = yield* _(
      Effect.tryPromise({
        try: () => readFile(filePath),
        catch: (e) => SeedError.from(e, 'SeedFileNotFound'),
      }),
    );

    const sharpImage = sharp(data)
      .resize({
        width: 800,
      })
      .jpeg({ mozjpeg: true, quality: 75 });

    return yield* _(
      Effect.all(
        [
          Effect.tryPromise({
            try: () => sharpImage.toBuffer(),
            catch: (e) => SharpError.from(e),
          }),
          Effect.tryPromise({
            try: () => sharpImage.metadata(),
            catch: (e) => SharpError.from(e),
          }),
        ],
        { concurrency: 'unbounded' },
      ),
    );
  });
