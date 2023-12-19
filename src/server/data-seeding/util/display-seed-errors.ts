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
    errorName?: string;
    statusCode?: number;
    stack?: string;
  };
}

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

export const displaySeedErrors = (error: unknown) => {
  const errorCauses = JSON.parse(JSON.stringify(error, null, 2)).cause;
  const failures = captureFailures(errorCauses);

  console.error(
    chalk.bold.bgYellowBright(
      `😵 ${failures.length} error${
        failures.length > 1 ? 's' : ''
      } occurred  \n`,
    ),
  );

  for (const { _tag, errorName, message } of failures) {
    console.error(
      chalk.bold.bgRedBright(
        `💥 ${_tag} ${errorName ? `- ${errorName}` : ''}  `,
      ),
    );
    console.error(`${chalk.hex('#a37e3e')(message)}\n`);
  }

  process.exit(1);
};
