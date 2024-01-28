import { CSSProperties } from 'react';

const splashScreenState = () => {
  const randomIndex = Math.floor(Math.random() * (7 - 2) + 1);

  return {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url('/hero/${randomIndex}.jpg')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  } as CSSProperties;
};

const gradiantScreenState = {
  background: 'linear-gradient(125deg, #2e1065 0%, #1e1b4b 45%, #0c4a6e)',
} as CSSProperties;

export const PageBackgroundState = {
  image: splashScreenState,
  gradiant: gradiantScreenState,
};
