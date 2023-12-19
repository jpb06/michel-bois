import type { ConfigError, Effect } from 'effect';
import { Context } from 'effect';

import type { AppError } from '../../../errors/application-error';
import { tapLayer } from '../../effects/tapLayer.effect';
import type { UploadFileArgs } from '../r2/implementations';
import type { Bucket } from '../r2/types/bucket.type';

export interface FileStorage {
  readonly getFileUrl: (
    fileName: string,
    bucket: Bucket,
  ) => Effect.Effect<never, AppError | ConfigError.ConfigError, string>;
  readonly uploadFile: (
    args: UploadFileArgs,
  ) => Effect.Effect<never, unknown, void>;
}

export const FileStorageLayerContext = Context.Tag<FileStorage>();

export const FileStorageLayer = {
  getFileUrl: (fileName: string, bucket: Bucket) =>
    tapLayer(FileStorageLayerContext, ({ getFileUrl }) =>
      getFileUrl(fileName, bucket),
    ),
  uploadFile: (args: UploadFileArgs) =>
    tapLayer(FileStorageLayerContext, ({ uploadFile }) => uploadFile(args)),
};
