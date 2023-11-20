import { prisma } from '../prisma.instance';
import { tryQuery } from '../try-query.effect';

export interface AssetInput {
  name: string;
  description?: string;
  month?: number;
  year?: number;
  documentKey: string;
  placeholderDataUri: string;
  width: number;
  height: number;
}

export const persistAsset = (data: AssetInput) =>
  tryQuery(
    prisma.asset.create({
      data,
    }),
  );
