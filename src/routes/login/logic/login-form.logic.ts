import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

import { zodPassword } from '@common/types';

export const loginFormSchema = zod.object({
  email: zod.string().email(),
  password: zodPassword,
  redirectTo: zod.string().optional(),
});

export type LoginForm = zod.infer<typeof loginFormSchema>;

export const loginFormResolver = zodResolver(loginFormSchema);
