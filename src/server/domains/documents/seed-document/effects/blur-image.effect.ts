import { Effect } from 'effect';
import type { SqipResult } from 'sqip';
import { sqip } from 'sqip';

import { SqipError } from '@errors';

export const blurImage = (fileName: string, buffer: Buffer) =>
  Effect.tryPromise({
    try: () =>
      sqip({
        plugins: [
          {
            name: 'sqip-plugin-primitive',
            options: {
              numberOfPrimitives: 16,
              rep: 8,
            },
          },
        ],
        input: buffer,
        outputFileName: `${fileName.substring(0, fileName.lastIndexOf('.'))}.svg`,
      }) as Promise<SqipResult>,
    catch: (e) => SqipError.from(e),
  });
