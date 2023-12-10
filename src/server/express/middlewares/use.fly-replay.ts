import type { Express } from 'express';

export const useFlyReplay = (app: Express) => {
  // if we're not in the primary region, then we need to make sure all
  // non-GET/HEAD/OPTIONS requests hit the primary region rather than read-only
  // Postgres DBs.
  // learn more: https://fly.io/docs/getting-started/multi-region-databases/#replay-the-request
  app.all('*', (req, res, next) => {
    const { method, path: pathname } = req;
    const { PRIMARY_REGION, FLY_REGION } = process.env;

    const isMethodReplayable = !['GET', 'OPTIONS', 'HEAD'].includes(method);
    const isReadOnlyRegion =
      FLY_REGION && PRIMARY_REGION && FLY_REGION !== PRIMARY_REGION;

    const shouldReplay = isMethodReplayable && isReadOnlyRegion;

    if (!shouldReplay) {
      return next();
    }

    const logInfo = {
      pathname,
      method,
      PRIMARY_REGION,
      FLY_REGION,
    };
    console.info(`Replaying:`, logInfo);
    res.set('fly-replay', `region=${PRIMARY_REGION}`);

    return res.sendStatus(409);
  });
};
