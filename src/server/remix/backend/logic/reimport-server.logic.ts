import fs from 'node:fs';
import url from 'node:url';
import path from 'path';

import type { ServerBuild } from '@remix-run/node';

export const reimportServer = async (): Promise<ServerBuild> => {
  const buildPath = path.resolve('./build/index.js');

  // cjs: manually remove the server build from the require cache
  Object.keys(require.cache).forEach((key) => {
    if (key.startsWith(buildPath)) {
      delete require.cache[key];
    }
  });

  const stat = fs.statSync(buildPath);

  // convert build path to URL for Windows compatibility with dynamic `import`
  const BUILD_URL = url.pathToFileURL(buildPath).href;

  // use a timestamp query parameter to bust the import cache
  return import(BUILD_URL + '?t=' + stat.mtimeMs);
};
