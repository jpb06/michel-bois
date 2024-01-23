import { hash as argonHash } from 'argon2';

import { tryPromise } from '@effects';

export const hash = (password: string) =>
  tryPromise(argonHash(password), 'ArgonHashError');
