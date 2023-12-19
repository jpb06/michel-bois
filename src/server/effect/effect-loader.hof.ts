import { LoaderFunctionArgs } from '@remix-run/server-runtime';
import { Effect } from 'effect';

export const effectLoader =
  <E, A>(
    effect: (
      request: LoaderFunctionArgs['request'],
    ) => Effect.Effect<never, E, A>,
  ) =>
  ({ request }: LoaderFunctionArgs) =>
    Effect.runPromise(effect(request));
