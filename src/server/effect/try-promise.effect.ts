import { Effect } from 'effect';

import { ErrorCode, AppError } from '../errors/application-error';

export const tryPromise = <T>(fn: Promise<T>, errorCode: ErrorCode) =>
  Effect.tryPromise({ try: () => fn, catch: AppError.fromError(errorCode) });
