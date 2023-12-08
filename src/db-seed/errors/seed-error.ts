export type SeedErrorCode =
  | 'document-orphan-found'
  | 'document-not-found-in-seed-data';

export class SeedError {
  readonly _tag = 'SeedError';

  readonly message: string | undefined;
  readonly errorCode: string | undefined;

  constructor(
    code: SeedErrorCode,
    readonly error?: unknown,
    readonly customMessage?: string,
  ) {
    if (error instanceof Error) {
      this.message = error.stack;
    } else {
      this.message = JSON.stringify(error);
    }

    this.errorCode = code;
  }

  public static new(code: SeedErrorCode, customMessage?: string) {
    return new SeedError(code, new Error(code), customMessage);
  }

  public static fromError(code: SeedErrorCode) {
    return (error: unknown) => new SeedError(code, error);
  }
}
