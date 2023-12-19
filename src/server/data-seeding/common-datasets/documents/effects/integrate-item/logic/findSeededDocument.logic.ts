import type { SeededDocument } from '../../../data/documents.data';
import { documentsSeedData } from '../../../data/documents.data';

export const findSeededDocument = (filePath: string) =>
  documentsSeedData.find(({ fileName }) =>
    filePath.endsWith(fileName),
  ) as SeededDocument;
