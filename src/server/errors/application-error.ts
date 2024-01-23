export type ErrorCode =
  | 'GetAwsSignedUrlError'
  | 'UploadFileError'
  | 'SeedFileNotFound'
  | 'SqipError'
  | 'SharpError'
  | 'FetchError'
  | 'ArgonHashError'
  | 'ArgonVerifyError'
  | 'SessionStorageError'
  | 'GlobError'
  | 'FormError'
  | 'SeedDocumentOrphanFound';

export class AppError {
  readonly _tag = 'AppError';

  readonly message: string | undefined;
  readonly errorCode: string | undefined;

  constructor(
    code: ErrorCode,
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

  public static new(code: ErrorCode, customMessage?: string) {
    return new AppError(code, new Error(code), customMessage);
  }

  public static fromError(code: ErrorCode) {
    return (error: unknown) => new AppError(code, error);
  }
}
