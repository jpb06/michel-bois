import { useSearchParams } from '@remix-run/react';

export const useRedirectTo = () => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/';

  return redirectTo;
};
