import chalk from 'chalk';
import { P, match } from 'ts-pattern';

type Tag = 'Parallel' | 'Sequential' | 'Fail' | 'Empty' | 'Interrupt';

interface Cause {
  _id: string;
  _tag: Tag;
  left?: Cause;
  right?: Cause;
  failure?: {
    _tag: string;
    path: string[];
    message: string;
    additionalMessage?: string;
    errorCode?: string;
    stack?: string;
    error?: unknown;
  };
}

const cleanupStack = (message: string) =>
  message.split('\n').reduce<string[]>((stack, line) => {
    const r = line.match(/^ {3}( at (.*michel-bois\/src\/.*))$/);
    if (!r) {
      return stack;
    }

    stack.push(r[1]);

    return stack;
  }, []);

const captureFailures = (
  cause: Cause | undefined,
): NonNullable<Cause['failure']>[] =>
  match(cause?._tag)
    .with(P.nullish, () => [])
    .with('Parallel', 'Sequential', () => [
      ...captureFailures(cause!.left),
      ...captureFailures(cause!.right),
    ])
    .with('Fail', () => [cause!.failure!])
    .otherwise(() => []);

export const displayEffectErrors = (error: unknown) => {
  const errorCauses = JSON.parse(JSON.stringify(error, null, 2)).cause;
  const failures = captureFailures(errorCauses);

  console.error(
    `🫠  ${chalk.bold.yellowBright.underline(
      `${failures.length} error${failures.length > 1 ? 's' : ''} occurred\n`,
    )}`,
  );
  for (const {
    _tag,
    errorCode,
    message,
    additionalMessage,
    stack,
  } of failures) {
    console.error(
      `❌ ${chalk.bold.bgRedBright(
        ` ${_tag} ${errorCode ? `- ${errorCode} ` : ''}`,
      )}`,
    );
    console.error(
      `${chalk.hex('#a37e3e')('│')}   ${chalk.bold.whiteBright(message)}`,
    );
    if (additionalMessage !== undefined) {
      console.error(
        `${chalk.hex('#a37e3e')('│')}   ${chalk.bold.whiteBright(additionalMessage)}`,
      );
    }

    if (stack) {
      const cleanedUpStack = cleanupStack(stack);

      console.error(chalk.hex('#a37e3e')('│'));
      console.error(
        `${chalk.hex('#a37e3e')(`├─${cleanedUpStack.slice(0, 1).join('\n├─')}\n╰─${cleanedUpStack.slice(-1)}`)}\n`,
      );
    }
  }
};
