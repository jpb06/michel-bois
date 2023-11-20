export type ErrorCode = 'GetAwsSignedUrlError' | 'UploadFileError';

export class AppError {
  readonly _tag = 'AppError';

  readonly message: string | undefined;
  readonly errorCode: string | undefined;

  constructor(
    code: ErrorCode,
    readonly error?: unknown,
  ) {
    if (error instanceof Error) {
      this.message = error.stack;
    } else {
      this.message = JSON.stringify(error);
    }

    this.errorCode = code;
  }

  public static new(code: ErrorCode) {
    return new AppError(code, new Error(code));
  }

  public static fromError(code: ErrorCode) {
    return (error: unknown) => new AppError(code, error);
  }
}
