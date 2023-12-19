import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

export const loginFormSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(1),
  redirectTo: zod.string().optional(),
});

export type LoginForm = zod.infer<typeof loginFormSchema>;

export const loginFormResolver = zodResolver(loginFormSchema);
