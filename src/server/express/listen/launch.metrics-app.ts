import type { Express } from 'express';

export const launchMetricsApp = (metricsApp: Express) => {
  const metricsPort = process.env.METRICS_PORT || 3010;

  metricsApp.listen(metricsPort, () => {
    console.log(`✅ metrics ready: http://localhost:${metricsPort}/metrics`);
  });
};
