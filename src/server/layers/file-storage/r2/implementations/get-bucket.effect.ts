import { match } from 'ts-pattern';

import { assetsBucket } from '../providers/fileStorageProvider';
import type { Bucket } from '../types/bucket.type';

export const getBucket = (bucket: Bucket) =>
  match(bucket)
    .with('assets', () => assetsBucket)
    .exhaustive();
