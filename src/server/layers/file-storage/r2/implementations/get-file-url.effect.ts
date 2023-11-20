import type { S3Client } from '@aws-sdk/client-s3';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl as awsGetSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Effect } from 'effect';

import { AppError } from '../../../../errors/application-error';
import { fileStorageProvider } from '../providers/fileStorageProvider';
import type { Bucket } from '../types/bucket.type';

import { getBucket } from './get-bucket';

const oneHourDuration = 60 * 60;

const getUrl = (provider: S3Client, bucket: string, documentKey: string) =>
  Effect.tryPromise({
    try: () =>
      awsGetSignedUrl(
        provider,
        new GetObjectCommand({
          Bucket: bucket,
          Key: documentKey,
        }),
        {
          expiresIn: oneHourDuration,
        },
      ),
    catch: AppError.fromError('GetAwsSignedUrlError'),
  });

export const getFileUrl = (documentKey: string, bucketName: Bucket) =>
  Effect.gen(function* (_) {
    const [provider, bucket] = yield* _(
      Effect.all([fileStorageProvider, getBucket(bucketName)], {
        concurrency: 'unbounded',
      }),
    );

    return yield* _(getUrl(provider, bucket, documentKey));
  });
