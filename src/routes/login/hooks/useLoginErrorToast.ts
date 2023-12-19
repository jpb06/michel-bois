import { useActionData } from '@remix-run/react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { WithMaybeFormError } from '@client/types';

export const useLoginErrorToast = () => {
  const data = useActionData<WithMaybeFormError>();

  useEffect(() => {
    if (data?.formError) {
      toast.error(data?.formError, {
        className: 'mt-20 !rounded-2xl',
      });
    }
  }, [JSON.stringify(data)]);
};
