import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

import { defaultTransition } from '../../motion';

export const Card = ({ children }: PropsWithChildren) => (
  <motion.div
    className="rainbow-gradiant-border rounded-3xl p-[3px] opacity-90 hover:opacity-95"
    whileHover={{ scale: 1.009 }}
    whileTap={{ scale: 1.007 }}
    transition={defaultTransition}
  >
    <div className="rounded-[calc(1.5rem-3px)] bg-gradient-to-tr from-sky-900 to-teal-950 p-5">
      {children}
    </div>
  </motion.div>
);
