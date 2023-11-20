import { Effect } from 'effect';

import { blurImage } from './blur-image.effect';

export const generatePlaceholder = (fileName: string, buffer: Buffer) =>
  Effect.gen(function* (_) {
    const result = yield* _(blurImage(fileName, buffer));

    return `data:image/svg+xml;base64,${result.content.toString('base64')}`;
  });
