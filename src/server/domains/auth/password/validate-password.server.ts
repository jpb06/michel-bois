import { verify } from 'argon2';
import { Effect } from 'effect';

import { CryptoError } from '@errors';

export const validatePassword = (hash: string, claim: string) =>
  Effect.tryPromise({
    try: () => verify(hash, claim),
    catch: (e) => CryptoError.from(e),
  });
