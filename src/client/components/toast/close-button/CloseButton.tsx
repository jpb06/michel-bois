import { Icon } from '@iconify/react';
import type { CloseButtonProps } from 'react-toastify';

export const CloseButton = ({
  closeToast,
}: CloseButtonProps): React.ReactNode => (
  <div className="mr-2 grid h-12 cursor-pointer content-center text-slate-400 hover:text-white">
    <Icon
      icon="ep:close-bold"
      className="h-6 w-6"
      onClick={closeToast as never}
    />
  </div>
);
