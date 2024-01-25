import { LoaderFunctionArgs, json } from '@remix-run/server-runtime';
import { Effect } from 'effect';

import { displayEffectErrors } from '@effects';

export const effectLoader =
  <E, A>(
    effect: (
      request: LoaderFunctionArgs['request'],
    ) => Effect.Effect<never, E, A>,
  ) =>
  ({ request }: LoaderFunctionArgs) =>
    Effect.runPromise(effect(request)).catch((error) => {
      displayEffectErrors(error);

      return json({
        source: request.url,
        error: 'An error occurred',
        status: 500,
      });
    });
