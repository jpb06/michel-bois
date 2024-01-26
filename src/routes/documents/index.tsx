import { json, useLoaderData } from '@remix-run/react';
import { Effect, Layer, pipe } from 'effect';

import { BaseCard, Image } from '@client/components';
import { useBackground } from '@client/state';
import { getDocumentsTask } from '@domains/documents';
import { effectLoader } from '@effects';
import { PrismaDatabaseLayerLive, R2FileStorageLayerLive } from '@layers';

export const loader = effectLoader(() =>
  pipe(
    pipe(getDocumentsTask, Effect.map(json)),
    Effect.provide(
      Layer.mergeAll(PrismaDatabaseLayerLive, R2FileStorageLayerLive),
    ),
  ),
);

const Documents = () => {
  useBackground({
    background: 'linear-gradient(125deg, #2e1065 0%, #1e1b4b 45%, #0c4a6e)',
  });
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col">
      <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
        {data.map(({ id, placeholderUrl, url, name }) => (
          <BaseCard key={id} className="mb-4">
            <Image
              url={url}
              placeholderUrl={placeholderUrl}
              name={name}
              className="h-auto w-full rounded-[calc(1.5rem-3px)] p-[2px]"
            />
          </BaseCard>
        ))}
      </div>
    </div>
  );
};

export default Documents;
