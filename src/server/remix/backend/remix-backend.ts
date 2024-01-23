import { installGlobals } from '@remix-run/node';
import compression from 'compression';
import express from 'express';
import morgan from 'morgan';
import sourceMapSupport from 'source-map-support';

import { launchApp } from './listen/launch.app';
import { launchMetricsApp } from './listen/launch.metrics-app';
import { reimportServer } from './logic/reimport-server.logic';
import { useAssetsFingerprinting } from './middlewares/use.assets-fingerprinting';
import { useDevRequestHandler } from './middlewares/use.dev-request-handler';
import { useFlyReplay } from './middlewares/use.fly-replay';
import { useHeaders } from './middlewares/use.headers';
import { usePrometheus } from './middlewares/use.prometheus';
import { useUrlCleanup } from './middlewares/use.url-cleanup';

const launchExpress = async () => {
  const initialBuild = await reimportServer();

  const app = express();
  const metricsApp = express();

  usePrometheus(app, metricsApp);
  useHeaders(app);
  useUrlCleanup(app);
  useFlyReplay(app);

  app.disable('x-powered-by');
  app.use(compression());
  app.use(morgan('tiny'));

  useAssetsFingerprinting(app);
  useDevRequestHandler(app, initialBuild);

  launchApp(app, initialBuild);
  launchMetricsApp(metricsApp);
};

sourceMapSupport.install();
installGlobals();
launchExpress();
