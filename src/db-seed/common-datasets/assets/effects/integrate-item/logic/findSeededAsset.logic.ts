import type { SeededAsset } from '../../../data/assets.data';
import { assetsSeedData } from '../../../data/assets.data';

export const findSeededAsset = (filePath: string) =>
  assetsSeedData.find(({ fileName }) =>
    filePath.endsWith(fileName),
  ) as SeededAsset;
