import type { PropsWithChildren } from 'react';
import { match } from 'ts-pattern';

import type { PropsWithClassName } from '@client/types';

type AlertProps = {
  type: 'info' | 'warning' | 'error' | 'success';
};

export const Alert = ({
  type,
  children,
  className,
}: PropsWithClassName<PropsWithChildren<AlertProps>>) => {
  const alertClass = match(type)
    .with('info', () => 'alert-info')
    .with('warning', () => 'alert-warning')
    .with('error', () => 'alert-error')
    .with('success', () => 'alert-success')
    .exhaustive();

  return (
    <div role="alert" className={`alert ${alertClass} ${className}`}>
      <span>{children}</span>
    </div>
  );
};
