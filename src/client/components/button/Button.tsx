import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

import type { PropsWithClassName } from '@client/types';

export const Button = ({
  className,
  children,
}: PropsWithClassName<PropsWithChildren>) => (
  <motion.button
    onPointerDownCapture={(e) => e.stopPropagation()}
    whileTap={{ scale: 0.9 }}
    type="submit"
    className={`btn ${className} text-right`}
  >
    {children}
  </motion.button>
);
