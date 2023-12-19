import { useEffect } from 'react';
import { UseFormWatch } from 'react-hook-form';
import { toast } from 'react-toastify';

import { LoginForm } from '../logic/login-form.logic';

export const useCloseToastOnInputChange = (watch: UseFormWatch<LoginForm>) => {
  const email = watch('email');
  const password = watch('password');

  useEffect(() => {
    toast.dismiss();
  }, [email, password]);
};
