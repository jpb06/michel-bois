import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

export const signupFormSchema = zod.object({
  name: zod.string().min(3),
  email: zod.string().email(),
  password: zod.string().min(1),
  redirectTo: zod.string().optional(),
});
export type SignupForm = zod.infer<typeof signupFormSchema>;

export const signupFormResolver = zodResolver(signupFormSchema);
