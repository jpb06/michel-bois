import { json, useLoaderData } from '@remix-run/react';
import { Effect, Layer, pipe } from 'effect';

import { BaseCard, Image } from '@client/components';
import { usePageStyle } from '@client/hooks';
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
  usePageStyle({
    background: 'gradiant',
    wrapper: 'padding',
  });
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col">
      <div className="mb-4 columns-1 gap-4 md:columns-2 lg:columns-3">
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
