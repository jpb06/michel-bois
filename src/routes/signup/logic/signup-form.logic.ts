import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

import { zodPassword } from '../../../common/zod.types';

export const signupFormSchema = zod.object({
  name: zod.string().min(3, {
    message: 'Required',
  }),
  email: zod.string().email(),
  password: zodPassword,
  redirectTo: zod.string().optional(),
});
export type SignupForm = zod.infer<typeof signupFormSchema>;

export const signupFormResolver = zodResolver(signupFormSchema);
