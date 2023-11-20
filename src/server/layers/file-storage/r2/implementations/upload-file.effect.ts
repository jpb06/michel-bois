import { PutObjectCommand } from '@aws-sdk/client-s3';
import { Effect } from 'effect';

import { AppError } from '../../../../errors/application-error';
import { fileStorageProvider } from '../providers/fileStorageProvider';
import type { Bucket } from '../types/bucket.type';

import { getBucket } from './get-bucket';

export interface UploadFileArgs {
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
}: UploadFileArgs) =>
  Effect.gen(function* (_) {
    const [provider, bucket] = yield* _(
      Effect.all([fileStorageProvider, getBucket(bucketName)], {
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
        catch: AppError.fromError('UploadFileError'),
      }),
    );
  });
