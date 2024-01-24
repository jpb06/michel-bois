import type { PropsWithChildren } from 'react';

import type { PropsWithClassName } from '../../types';

import { BaseCard } from './BaseCard';

export const Card = ({
  children,
  className,
}: PropsWithChildren<PropsWithClassName>) => (
  <BaseCard className={className}>
    <div className="rounded-[calc(1.5rem-3px)] bg-gradient-to-tr from-sky-900 to-teal-950 p-5">
      {children}
    </div>
  </BaseCard>
);
