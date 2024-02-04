import { match } from 'ts-pattern';

import { r2AssetsBucket } from '../providers/r2-file-storage.provider';
import type { Bucket } from '../types/bucket.type';

export const getBucket = (bucket: Bucket) =>
  match(bucket)
    .with('assets', () => r2AssetsBucket)
    .exhaustive();
