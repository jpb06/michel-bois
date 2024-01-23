import type { Express } from 'express';

export const useHeaders = (app: Express): void => {
  app.use((req, res, next) => {
    res.set('x-fly-region', process.env.FLY_REGION ?? 'unknown');
    res.set('Strict-Transport-Security', `max-age=${60 * 60 * 24 * 365 * 100}`);

    next();
  });
};
