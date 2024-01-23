import { useSetAtom } from 'jotai';
import { CSSProperties, useEffect } from 'react';

import { backgroundAtom } from './background.atom';

export const useBackground = (style: CSSProperties = {}) => {
  const setMainStyle = useSetAtom(backgroundAtom);

  useEffect(() => {
    setMainStyle({
      style,
    });
  }, [setMainStyle]);
};
