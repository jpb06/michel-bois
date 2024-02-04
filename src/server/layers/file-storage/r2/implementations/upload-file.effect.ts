import { PutObjectCommand } from '@aws-sdk/client-s3';
import { Effect } from 'effect';

import { FileStorageError } from '@errors';

import { r2FileStorageProvider } from '../providers/r2-file-storage.provider';
import type { Bucket } from '../types/bucket.type';

import { getBucket } from './get-bucket.effect';

export interface UploadFileInput {
  bucketName: Bucket;
  key: string;
  data: Buffer;
  contentType?: string;
}

export const uploadFile = ({
  bucketName,
  key,
  data,
  contentType,
}: UploadFileInput) =>
  Effect.gen(function* (_) {
    const [provider, bucket] = yield* _(
      Effect.all([r2FileStorageProvider, getBucket(bucketName)], {
        concurrency: 'unbounded',
      }),
    );

    yield* _(
      Effect.tryPromise({
        try: () =>
          provider.send(
            new PutObjectCommand({
              Body: data,
              ContentType: contentType,
              Key: key,
              Bucket: bucket,
            }),
          ),
        catch: (e) => FileStorageError.from(e),
      }),
    );
  });
