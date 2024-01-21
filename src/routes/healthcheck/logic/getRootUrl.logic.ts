import { LoaderFunctionArgs } from '@remix-run/node';

export const getRootUrl = (request: LoaderFunctionArgs['request']) => {
  const host =
    request.headers.get('X-Forwarded-Host') ?? request.headers.get('host');

  return new URL('/', `http://${host}`);
};
