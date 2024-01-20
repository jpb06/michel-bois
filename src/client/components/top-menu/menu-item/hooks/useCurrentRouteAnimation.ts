import { useAnimate } from 'framer-motion';
import { useEffect } from 'react';

import { useCurrentRoute } from '../../../../hooks';
import {
  selectedMenuItemState,
  idleMenuItemState,
} from '../logic/animation-states';

export const useCurrentRouteAnimation = (to: string) => {
  const currentRoute = useCurrentRoute();
  const [scope, animate] = useAnimate();

  const isActive = currentRoute === to;

  useEffect(() => {
    animate(
      scope.current,
      isActive ? selectedMenuItemState : idleMenuItemState,
    );
  }, [to, currentRoute]);

  return { isActive, scope };
};
