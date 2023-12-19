import chalk from 'chalk';
import { Effect } from 'effect';

import { compressFile } from './effects/compress-file.effect';
import { generatePlaceholder } from './effects/generate-placeholder.effect';
import { uploadAndPersist } from './effects/upload-and-persist.effect';
import { findSeededDocument } from './logic/findSeededDocument.logic';

export const integrateDocument = (filePath: string) =>
  Effect.gen(function* (_) {
    const document = findSeededDocument(filePath);

    const [fileData, metadata] = yield* _(compressFile(document.fileName));

    const placeholderDataUrl = yield* _(
      generatePlaceholder(document.fileName, fileData),
    );

    const [, persistedDocument] = yield* _(
      uploadAndPersist(document, fileData, metadata, placeholderDataUrl),
    );

    console.info(
      `📂 ${chalk.green.bold(`'${document.fileName}'`)} ${chalk.gray(`added`)}`,
    );

    return persistedDocument;
  });
