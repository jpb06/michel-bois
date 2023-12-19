import path from 'path';

import { Effect } from 'effect';
import { readFile } from 'fs-extra';
import sharp from 'sharp';

export const compressFile = (fileName: string) =>
  Effect.gen(function* (_) {
    const filePath = path.join(__dirname, `./../../../data/img/${fileName}`);

    const data = yield* _(Effect.tryPromise(() => readFile(filePath)));

    const sharpImage = sharp(data)
      .resize({
        width: 800,
      })
      .jpeg({ mozjpeg: true, quality: 75 });

    return yield* _(
      Effect.all(
        [
          Effect.tryPromise(() => sharpImage.toBuffer()),
          Effect.tryPromise(() => sharpImage.metadata()),
        ],
        { concurrency: 'unbounded' },
      ),
    );
  });
