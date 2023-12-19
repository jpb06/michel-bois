import { useMatches } from '@remix-run/react';
import { useMemo } from 'react';

export const useMatchesData = (
  routeId: string,
): Record<string, unknown> | undefined => {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === routeId),
    [matchingRoutes, routeId],
  );

  return route?.data as Record<string, unknown>;
};
