import { prisma, tryQuery } from '../internal';

export interface DocumentInput {
  name: string;
  description?: string;
  month?: number;
  year?: number;
  documentKey: string;
  placeholderDataUri: string;
  width: number;
  height: number;
}

export const persistDocument = (data: DocumentInput) =>
  tryQuery(
    prisma.document.create({
      data,
    }),
  );
