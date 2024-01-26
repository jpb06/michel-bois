import { Document } from '@prisma/client';
import { Effect } from 'effect';

import { DatabaseLayer, FileStorageLayer } from '@layers';

const getUrl = (document: Document) =>
  Effect.gen(function* (_) {
    const url = yield* _(
      FileStorageLayer.getFileUrl(document.documentKey, 'assets'),
    );

    return { ...document, url };
  });

export const getDocumentsTask = Effect.gen(function* (_) {
  const documents = yield* _(DatabaseLayer.documents.get());
  const documentsWithFileUrl = yield* _(Effect.forEach(documents, getUrl));

  return documentsWithFileUrl.map((d) => ({
    id: d.id,
    name: d.name,
    description: d.description,
    month: d.month,
    year: d.year,
    url: d.url,
    placeholderUrl: d.placeholderDataUri,
    height: d.height,
    width: d.width,
  }));
});
