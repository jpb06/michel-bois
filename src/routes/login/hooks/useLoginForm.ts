import { useRemixForm } from 'remix-hook-form';

import { loginFormResolver } from '../logic/login-form.logic';

export const useLoginForm = () => {
  const { handleSubmit, control, watch } = useRemixForm({
    shouldFocusError: true,
    mode: 'onSubmit',
    resolver: loginFormResolver,
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return {
    onSubmit: handleSubmit,
    control,
    watch,
  };
};
