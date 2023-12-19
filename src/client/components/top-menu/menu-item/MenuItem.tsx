import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';

import { brandName } from '../constants/brand-name.constant';
import type { MenuTextState } from '../TopMenu';

type MenuItemProps = {
  setMenuText: React.Dispatch<React.SetStateAction<MenuTextState>>;
  Icon: JSX.Element;
  text: string;
  to: string;
};

export const MenuItem = ({ to, setMenuText, Icon, text }: MenuItemProps) => (
  <motion.div initial="rest" whileHover="hover" animate="rest">
    <motion.div
      transition={{
        duration: 0.3,
        type: 'spring',
        stiffness: 400,
        damping: 17,
      }}
      whileHover={{
        scale: 1.7,
        marginTop: '1.2rem',
        marginLeft: '0.6rem',
        marginRight: '0.6rem',
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
      }}
      whileTap={{
        scale: 1.2,
        color: 'white',
      }}
      onHoverStart={() => setMenuText({ text, isBrand: false })}
      onHoverEnd={() => setMenuText({ text: brandName, isBrand: true })}
      className="flex flex-col items-center"
    >
      <Link to={to}>
        <div className="mx-1 rounded-xl bg-sky-800 p-1 text-teal-600">
          {Icon}
        </div>
      </Link>
    </motion.div>
  </motion.div>
);
