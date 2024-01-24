import { atom } from 'jotai';
import { CSSProperties } from 'react';

export const splashScreenState: CSSProperties = {
  background:
    "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)),url('/splashscreen.jpg')",
  backgroundSize: 'cover',
};

export interface BackgroundState {
  style: CSSProperties | undefined;
}

export const backgroundAtom = atom<BackgroundState>({
  style: splashScreenState,
});
