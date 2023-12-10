import express from 'express';
import type { Express } from 'express';

export const useAssetsFingerprinting = (app: Express) => {
  // Remix fingerprints its assets so we can cache forever.
  app.use(
    '/build',
    express.static('public/build', { immutable: true, maxAge: '1y' }),
  );

  // Everything else (like favicon.ico) is cached for an hour. You may want to be more aggressive with this caching.
  app.use(express.static('public', { maxAge: '1h' }));
};
