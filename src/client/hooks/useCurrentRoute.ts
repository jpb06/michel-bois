import { useMatches } from '@remix-run/react';

export const useCurrentRoute = () => {
  const matches = useMatches();
  const { id } = matches[matches.length - 1];

  return `/${id.split('/')[1]}`;
};
