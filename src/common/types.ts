import { z } from 'zod';

export const zodUserId = z.string().uuid().brand('UserId');

export type UserId = z.infer<typeof zodUserId>;
