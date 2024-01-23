import type { Express } from 'express';

export const useUrlCleanup = (app: Express) => {
  app.use((req, res, next) => {
    // /clean-urls/ -> /clean-urls
    if (req.path.endsWith('/') && req.path.length > 1) {
      const query = req.url.slice(req.path.length);
      const safepath = req.path.slice(0, -1).replace(/\/+/g, '/');
      res.redirect(301, safepath + query);
      return;
    }

    next();
  });
};
