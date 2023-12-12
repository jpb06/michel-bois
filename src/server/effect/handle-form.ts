import { Effect } from 'effect';
import { FieldErrors, FieldValues, Resolver } from 'react-hook-form';
import { getValidatedFormData } from 'remix-hook-form';

export class ValidationError<T extends FieldValues> {
  readonly _tag = 'ValidationError';

  constructor(
    readonly errors: FieldErrors<T>,
    readonly defaultValues: Record<string, unknown>,
  ) {}
}

export const handleForm = <T extends FieldValues>(
  request: Request,
  resolver: Resolver,
) =>
  Effect.gen(function* (_) {
    const {
      errors,
      data,
      receivedValues: defaultValues,
    } = yield* _(
      Effect.tryPromise(() => getValidatedFormData<T>(request, resolver)),
    );

    if (errors) {
      return yield* _(Effect.fail(new ValidationError(errors, defaultValues)));
    }

    return { data: data as T, defaultValues };
  });
