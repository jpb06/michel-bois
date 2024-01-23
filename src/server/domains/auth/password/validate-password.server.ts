import { verify } from 'argon2';

import { tryPromise } from '@effects';

export const validatePassword = (hash: string, claim: string) =>
  tryPromise(verify(hash, claim), 'ArgonVerifyError');
