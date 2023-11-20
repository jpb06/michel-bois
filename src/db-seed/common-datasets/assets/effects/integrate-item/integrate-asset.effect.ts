import chalk from 'chalk';
import { Effect } from 'effect';

import { compressFile } from './effects/compress-file.effect';
import { generatePlaceholder } from './effects/generate-placeholder.effect';
import { uploadAndPersist } from './effects/upload-and-persist.effect';
import { findSeededAsset } from './logic/findSeededAsset.logic';

export const integrateAsset = (filePath: string) =>
  Effect.gen(function* (_) {
    const asset = findSeededAsset(filePath);

    const [fileData, metadata] = yield* _(compressFile(asset.fileName));

    const placeholderDataUrl = yield* _(
      generatePlaceholder(asset.fileName, fileData),
    );

    const [, persistedAsset] = yield* _(
      uploadAndPersist(asset, fileData, metadata, placeholderDataUrl),
    );

    console.info(chalk.green.bold(`'${asset.fileName}' added`));

    return persistedAsset;
  });
