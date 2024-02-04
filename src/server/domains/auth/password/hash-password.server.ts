import { hash as argonHash } from 'argon2';
import { Effect } from 'effect';

import { CryptoError } from '@errors';

export const hash = (password: string) =>
  Effect.tryPromise({
    try: () => argonHash(password),
    catch: (e) => CryptoError.from(e),
  });
