import { Effect } from 'effect';
import type { Metadata } from 'sharp';

import { DatabaseLayer, FileStorageLayer } from '@layers';

interface Document {
  fileName: string;
  month?: number;
  year?: number;
  name: string;
  description?: string;
}

export const uploadAndPersist = (
  { fileName, name, description, month, year }: Document,
  fileData: Buffer,
  metadata: Metadata,
  placeholderDataUrl: string,
) =>
  Effect.all(
    [
      FileStorageLayer.uploadFile({
        key: fileName,
        bucketName: 'assets',
        data: fileData,
        contentType: 'image/jpeg',
      }),
      DatabaseLayer.documents.create({
        name,
        description,
        month,
        year,
        documentKey: fileName,
        placeholderDataUri: placeholderDataUrl,
        width: metadata.width ?? 0,
        height: metadata.height ?? 0,
      }),
    ],
    { concurrency: 'unbounded' },
  );
