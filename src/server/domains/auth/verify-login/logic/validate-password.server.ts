import { verify } from 'argon2';
import { Effect } from 'effect';

export const validatePassword = (hash: string, claim: string) =>
  Effect.tryPromise(() => verify(hash, claim));
