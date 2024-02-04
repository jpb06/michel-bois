import { z } from 'zod';

export const zodUserId = z.string().uuid().brand('UserId');

export type UserId = z.infer<typeof zodUserId>;

export const zodPassword = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/\d/, 'Password must contain at least one number')
  .regex(/[A-Z]+/, 'Password must contain at least one uppercase letter')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one symbol');
