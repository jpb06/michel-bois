import { User } from '@prisma/client';

import { useMatchesData } from './useMatchesData';

const isUser = (user: unknown): user is User =>
  user !== null &&
  typeof user === 'object' &&
  'email' in user &&
  typeof user.email === 'string';

export const useOptionalUser = (): User | undefined => {
  const data = useMatchesData('root');
  if (!data || !isUser(data.user)) {
    return undefined;
  }

  return data.user;
};
