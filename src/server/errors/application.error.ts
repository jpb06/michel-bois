export type ErrorCode = '';

export class AppError {
  readonly _tag = 'AppError';

  readonly stack: string | undefined;
  readonly errorCode: string | undefined;
  readonly message: string | undefined;
  readonly additionalMessage: string | undefined;
  readonly error?: unknown;

  constructor(code: ErrorCode, error?: unknown, message?: string) {
    if (error instanceof Error) {
      this.message = message;
      this.stack = error.stack;
    } else {
      this.message = JSON.stringify(error);
    }

    this.errorCode = code;
  }

  public static new(code: ErrorCode, additionalMessage?: string) {
    return new AppError(code, new Error(code), additionalMessage);
  }

  public static from(code: ErrorCode, error: unknown) {
    return new AppError(
      code,
      new Error(code),
      (error as { message?: string })?.message,
    );
  }
}
