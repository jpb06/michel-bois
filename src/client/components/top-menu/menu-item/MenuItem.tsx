import { Icon, type IconifyIcon } from '@iconify/react';
import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';

import { defaultTransition } from '../../../motion/default-transition.motion';
import { brandName } from '../constants/brand-name.constant';
import type { MenuTextState } from '../TopMenu';

import { useCurrentRouteAnimation } from './hooks/useCurrentRouteAnimation';
import {
  hoverMenuItemState,
  idleMenuItemState,
  selectedMenuItemState,
  tapMenuItemState,
} from './logic/animation-states';

type MenuItemProps = {
  setMenuText: React.Dispatch<React.SetStateAction<MenuTextState>>;
  icon: string | IconifyIcon;
  text: string;
  to: string;
};

export const MenuItem = ({ to, setMenuText, icon, text }: MenuItemProps) => {
  const { scope, isActive } = useCurrentRouteAnimation(to);

  return (
    <motion.div
      ref={scope}
      transition={defaultTransition}
      initial={isActive ? selectedMenuItemState : idleMenuItemState}
      whileHover={hoverMenuItemState}
      whileTap={tapMenuItemState}
      onHoverStart={() => setMenuText({ text, isBrand: false })}
      onHoverEnd={() => setMenuText({ text: brandName, isBrand: true })}
    >
      <Link to={to} className='className="flex items-center" flex-col'>
        <div
          className={`m-1 ${isActive ? 'rainbow-gradiant-border' : 'to-bg-sky-800 border-2 border-sky-900 bg-gradient-to-b from-cyan-900 hover:border-0 hover:text-white'} rounded-xl  p-1 ${isActive ? 'text-white' : 'text-emerald-400'} hover:bg-sky-900 hover:text-emerald-500`}
        >
          <Icon icon={icon} className="m-2 h-6 w-6" />
        </div>
      </Link>
    </motion.div>
  );
};
