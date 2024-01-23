import type { SqipResult } from 'sqip';
import { sqip } from 'sqip';

import { tryPromise } from '@effects';

export const blurImage = (fileName: string, buffer: Buffer) =>
  tryPromise(
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
    'SqipError',
  );
