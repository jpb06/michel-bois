import { Layer } from 'effect';

import { FileStorageLayerContext } from '../layer/fileStorage.layer';

import { getFileUrl, uploadFile } from './implementations';

export const R2FileStorageLayerLive = Layer.succeed(
  FileStorageLayerContext,
  FileStorageLayerContext.of({
    getFileUrl,
    uploadFile,
  }),
);
