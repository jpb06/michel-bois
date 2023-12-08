import { Effect } from 'effect';
import type { Metadata } from 'sharp';

import { DatabaseLayer } from '@layers/database';
import { FileStorageLayer } from '@layers/file-storage';

import type { SeededDocument } from '../../../data/documents.data';

export const uploadAndPersist = (
  asset: SeededDocument,
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
      DatabaseLayer.documents.persist({
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
