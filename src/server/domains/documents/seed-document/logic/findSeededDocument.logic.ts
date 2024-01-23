import {
  SeededDocument,
  documentsSeedData,
} from '../../../seeding/documents/data/documents.data';

export const findSeededDocument = (filePath: string) =>
  documentsSeedData.find(({ fileName }) =>
    filePath.endsWith(fileName),
  ) as SeededDocument;
