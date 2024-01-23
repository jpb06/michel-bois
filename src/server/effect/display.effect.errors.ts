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

  for (const { _tag, errorCode, message } of failures) {
    console.error(
      `❌ ${chalk.bold.bgRedBright(
        ` ${_tag} ${errorCode ? `- ${errorCode} ` : ''}`,
      )}`,
    );

    const stack = cleanupStack(message);

    console.error(
      `${chalk.hex('#a37e3e')(`├─${stack.slice(0, 1).join('\n├─')}\n╰─${stack.slice(-1)}`)}\n`,
    );
  }
};
