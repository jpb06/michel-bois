import { Target, TargetAndTransition, VariantLabels } from 'framer-motion';

export const idleMenuItemState: boolean | Target | VariantLabels = {
  scale: 1,
  marginTop: 0,
  marginLeft: 0,
  marginRight: 0,
  paddingLeft: 0,
  paddingRight: 0,
};

export const selectedMenuItemState: boolean | Target | VariantLabels = {
  scale: 1.2,
  marginTop: '0.5rem',
  marginLeft: '0.1rem',
  marginRight: '0.1rem',
  paddingLeft: '0.1rem',
  paddingRight: '0.1rem',
};

export const hoverMenuItemState: VariantLabels | TargetAndTransition = {
  scale: 1.7,
  marginTop: '1.2rem',
  marginLeft: '0.6rem',
  marginRight: '0.6rem',
  paddingLeft: '0.5rem',
  paddingRight: '0.5rem',
};

export const tapMenuItemState: VariantLabels | TargetAndTransition = {
  scale: 1.2,
};
