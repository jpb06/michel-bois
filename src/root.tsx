import { cssBundleHref } from '@remix-run/css-bundle';
import { json, type LinksFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { Effect, pipe } from 'effect';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { CloseButton, TopMenu } from '@client/components';
import { getUser } from '@domains/auth';
import { effectLoader } from '@effects';
import { PrismaDatabaseLayerLive } from '@layers';

import stylesheet from './tailwind.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export const loader = effectLoader((request) =>
  pipe(
    getUser(request),
    Effect.map((user) => json({ user })),
    Effect.provide(PrismaDatabaseLayerLive),
  ),
);

const App = () => (
  <html
    lang="en"
    className="hero min-h-screen"
    style={{
      backgroundImage: `url("/splashscreen.jpg")`,
    }}
  >
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <Meta />
      <Links />
    </head>
    <body className="flex h-full w-full flex-col items-center">
      <TopMenu />
      <ToastContainer
        position="top-center"
        theme="colored"
        limit={2}
        closeButton={CloseButton}
      />
      <Outlet />
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>
);

export default App;
