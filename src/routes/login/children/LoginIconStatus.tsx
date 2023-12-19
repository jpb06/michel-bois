import { Icon } from '@iconify/react';
import { useActionData, useNavigation } from '@remix-run/react';

import type { WithMaybeFormError } from '@client/types';

export const LoginIconStatus = () => {
  const data = useActionData<WithMaybeFormError>();
  const navigation = useNavigation();

  if (navigation.state !== 'idle') {
    return (
      <span className="h-20> loading loading-spinner w-20 text-teal-600"></span>
    );
  }

  if (data?.formError) {
    return <Icon icon="ooui:error" className="h-20 w-20 text-red-400" />;
  }

  return (
    <Icon icon="mingcute:user-4-fill" className="h-20 w-20 text-teal-600" />
  );
};
