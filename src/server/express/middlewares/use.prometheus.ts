import prometheus from '@isaacs/express-prometheus-middleware';
import type { Express } from 'express';

export const usePrometheus = (app: Express, metricsApp: Express): void => {
  app.use(
    prometheus({
      metricsPath: '/metrics',
      collectDefaultMetrics: true,
      metricsApp,
    }),
  );
};
