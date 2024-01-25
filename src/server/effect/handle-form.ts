import { Effect } from 'effect';
import { FieldErrors, FieldValues, Resolver } from 'react-hook-form';
import { getValidatedFormData } from 'remix-hook-form';

import { tryPromise } from '@effects';

export class ValidationError<T extends FieldValues> {
  readonly _tag = 'ValidationError';

  constructor(
    readonly errors: FieldErrors<T>,
    readonly defaultValues: Record<string, unknown>,
  ) {}
}

export const handleForm = <T extends FieldValues>(
  request: Request,
  resolver: Resolver<T>,
) =>
  Effect.gen(function* (_) {
    const {
      errors,
      data,
      receivedValues: defaultValues,
    } = yield* _(
      tryPromise(getValidatedFormData<T>(request, resolver), 'FormError'),
    );

    if (errors) {
      return yield* _(Effect.fail(new ValidationError(errors, defaultValues)));
    }

    return { data: data as T, defaultValues };
  });
