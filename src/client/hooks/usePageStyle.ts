import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { match } from 'ts-pattern';

import {
  pageStyleAtom,
  PageBackgroundState,
  PageWrapperState,
} from '@client/state';

type Background = 'image' | 'gradiant';
type Wrapper = 'padding' | 'no-padding';

interface PageStyleHookInput {
  background: Background;
  wrapper: Wrapper;
}

const defaultstate: PageStyleHookInput = {
  background: 'image',
  wrapper: 'padding',
};

export const usePageStyle = ({
  background,
  wrapper,
}: PageStyleHookInput = defaultstate) => {
  const setMainStyle = useSetAtom(pageStyleAtom);

  useEffect(() => {
    setMainStyle({
      backgroundStyle: match(background)
        .with('gradiant', () => PageBackgroundState.gradiant)
        .with('image', () => PageBackgroundState.image())
        .exhaustive(),
      wrapperClassName: match(wrapper)
        .with('no-padding', () => PageWrapperState.noPadding)
        .with('padding', () => PageWrapperState.withPadding)
        .exhaustive(),
    });
  }, [setMainStyle]);
};
