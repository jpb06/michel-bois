import type { ConfigError, Effect } from 'effect';
import { Context } from 'effect';

import type { FileStorageError } from '@errors';

import { tapLayer } from '../../effects/tapLayer.effect';
import type { UploadFileInput } from '../r2/implementations';
import type { Bucket } from '../r2/types/bucket.type';

export interface FileStorage {
  readonly getFileUrl: (
    fileName: string,
    bucket: Bucket,
  ) => Effect.Effect<never, FileStorageError | ConfigError.ConfigError, string>;
  readonly uploadFile: (
    input: UploadFileInput,
  ) => Effect.Effect<never, FileStorageError | ConfigError.ConfigError, void>;
}

export const FileStorageLayerContext = Context.Tag<FileStorage>();

export const FileStorageLayer = {
  getFileUrl: (fileName: string, bucket: Bucket) =>
    tapLayer(FileStorageLayerContext, ({ getFileUrl }) =>
      getFileUrl(fileName, bucket),
    ),
  uploadFile: (input: UploadFileInput) =>
    tapLayer(FileStorageLayerContext, ({ uploadFile }) => uploadFile(input)),
};
