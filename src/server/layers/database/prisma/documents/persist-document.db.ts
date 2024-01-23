import { prisma, tryQuery } from '../internal';

export interface PersistDocumentInput {
  name: string;
  description?: string;
  month?: number;
  year?: number;
  documentKey: string;
  placeholderDataUri: string;
  width: number;
  height: number;
}

export const persistDocument = (data: PersistDocumentInput) =>
  tryQuery(
    prisma.document.create({
      data,
    }),
  );
