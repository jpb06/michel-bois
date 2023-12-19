import { ActionFunctionArgs, json } from '@remix-run/server-runtime';
import { Effect, pipe } from 'effect';
import { FieldValues } from 'react-hook-form';

import { ValidationError } from './handle-form';

export const effectAction =
  <E, A, TFieldValues extends FieldValues>(
    effect: (
      actionArgs: ActionFunctionArgs,
    ) => Effect.Effect<never, E | ValidationError<TFieldValues>, A>,
  ) =>
  (actionArgs: ActionFunctionArgs) =>
    Effect.runPromise(
      pipe(
        effect(actionArgs),
        Effect.catchTag('ValidationError' as never, (e) => {
          const meta = e as unknown as ValidationError<TFieldValues>;

          return Effect.succeed(json(meta));
        }),
      ),
    );
