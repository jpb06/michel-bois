export class FormError {
  readonly _tag = 'FormError';

  readonly stack: string | undefined;
  readonly message: string | undefined;
  readonly additionalMessage: string | undefined;
  readonly error?: unknown;

  constructor(error?: unknown, additionalMessage?: string) {
    const { message, stack } = error as Error;

    this.message = message;
    this.additionalMessage = additionalMessage;
    this.stack = stack;
  }

  public static new(additionalMessage?: string) {
    return new FormError(new Error(additionalMessage));
  }

  public static from(error: unknown, additionalMessage?: string) {
    return new FormError(
      new Error((error as Error).message),
      additionalMessage,
    );
  }
}
