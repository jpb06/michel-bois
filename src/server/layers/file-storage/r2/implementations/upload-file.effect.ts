import { PutObjectCommand } from '@aws-sdk/client-s3';
import { Effect } from 'effect';

import { tryPromise } from '@effects';

import { fileStorageProvider } from '../providers/fileStorageProvider';
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
      Effect.all([fileStorageProvider, getBucket(bucketName)], {
        concurrency: 'unbounded',
      }),
    );

    yield* _(
      tryPromise(
        provider.send(
          new PutObjectCommand({
            Body: data,
            ContentType: contentType,
            Key: key,
            Bucket: bucket,
          }),
        ),
        'UploadFileError',
      ),
    );
  });
