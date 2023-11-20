import { S3Client } from '@aws-sdk/client-s3';
import { pipe, Config, Effect } from 'effect';

const getR2Config = pipe(
  Effect.all([
    Effect.config(Config.string('CLOUDFLARE_ACCOUNT_ID')),
    Effect.config(Config.string('R2_DOCUMENTS_ACCESS_KEY_ID')),
    Effect.config(Config.string('R2_DOCUMENTS_SECRET_ACCESS_KEY')),
  ]),
  Effect.map(([cloudflareAccountId, accessKeyId, secretAccessKey]) => ({
    cloudflareAccountId,
    accessKeyId,
    secretAccessKey,
  })),
);

export const fileStorageProvider = pipe(
  getR2Config,
  Effect.flatMap((config) =>
    Effect.succeed(
      new S3Client({
        region: 'auto',
        endpoint: `https://${config.cloudflareAccountId}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: config.accessKeyId,
          secretAccessKey: config.secretAccessKey,
        },
      }),
    ),
  ),
);

export const assetsBucket = Effect.config(
  Config.string('R2_DOCUMENT_ASSETS_BUCKET_NAME'),
);

export const placeholdersBucket = Effect.config(
  Config.string('R2_DOCUMENT_PLACEHOLDERS_BUCKET_NAME'),
);
