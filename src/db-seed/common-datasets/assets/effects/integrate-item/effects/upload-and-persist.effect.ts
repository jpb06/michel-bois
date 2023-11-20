import { Effect } from 'effect';
import type { Metadata } from 'sharp';

import { DatabaseLayer } from '@server/layers/database';
import { FileStorageLayer } from '@server/layers/file-storage';

import type { SeededAsset } from '../../../data/assets.data';

export const uploadAndPersist = (
  asset: SeededAsset,
  fileData: Buffer,
  metadata: Metadata,
  placeholderDataUrl: string,
) =>
  Effect.all(
    [
      FileStorageLayer.uploadFile({
        key: asset.fileName,
        bucketName: 'assets',
        data: fileData,
        contentType: 'image/jpeg',
      }),
      DatabaseLayer.assets.persist({
        name: asset.name,
        description: asset.description,
        month: asset.month,
        year: asset.year,
        documentKey: asset.fileName,
        placeholderDataUri: placeholderDataUrl,
        width: metadata.width ?? 0,
        height: metadata.height ?? 0,
      }),
    ],
    { concurrency: 'unbounded' },
  );
