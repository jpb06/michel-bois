import type { Prisma } from '@prisma/client';
import { Effect, pipe } from 'effect';

export class DbError {
  readonly _tag = 'DbError';

  readonly meta?: unknown;
  readonly message: string;
  readonly stack?: string;
  readonly statusCode: number = 500;
  readonly errorName?: string;

  constructor(error: unknown, prismaErrorName?: string) {
    const e = error as { message: string; meta?: unknown; stack?: string };
    if ('meta' in e) {
      this.meta = e.meta;
    }
    this.message = e.message;
    this.stack = e.stack;
    this.errorName = prismaErrorName;
  }
}

export const tryQuery = <TResult>(p: Prisma.PrismaPromise<TResult>) =>
  pipe(
    Effect.tryPromise(() => p),
    Effect.catchAll((e) => {
      const prismaError = e as { name: string };
      return Effect.fail(new DbError(e, prismaError.name));
    }),
  );
