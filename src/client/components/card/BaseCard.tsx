import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

import { defaultTransition } from '../../motion';
import type { PropsWithClassName } from '../../types';

export const BaseCard = ({
  children,
  className,
}: PropsWithChildren<PropsWithClassName>) => (
  <motion.div
    className={`rainbow-gradiant-border rounded-3xl p-[3px] opacity-90 hover:opacity-95 ${className ? className : ''}`}
    whileHover={{ scale: 1.011 }}
    whileTap={{ scale: 1.007 }}
    transition={defaultTransition}
  >
    {children}
  </motion.div>
);
