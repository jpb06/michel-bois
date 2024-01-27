import { atom } from 'jotai';
import { CSSProperties } from 'react';

import { PageBackgroundState } from './states/page-background.states';
import { PageWrapperState } from './states/page-wrapper.states';

export interface pageStyleState {
  backgroundStyle: CSSProperties | undefined;
  wrapperClassName: string | undefined;
}

export const pageStyleAtom = atom<pageStyleState>({
  backgroundStyle: PageBackgroundState.image(),
  wrapperClassName: PageWrapperState.withPadding,
});
