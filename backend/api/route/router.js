
const express = require('express');
const glob = require('glob');
const path = require('path');
const env = require('../../env');

/**
 * Create routes for the api based in the path provided in env
 */
const Router = () => {
  return new Promise((resolve, reject) => {
    const router = new express.Router();
    glob(env.routes_dir, { ignore: '**/router.js' }, (err, routes) => {
      if (err) {
        reject(err);
      } else {
        routes.forEach(route => {
          const relativeRoute = path.relative(__dirname, route).replace(/\\/g, '/');
          const dir = `/${env.api_prefix}/${relativeRoute.replace(path.basename(relativeRoute), '')}${path.parse(relativeRoute).name}`;
          router.use(dir, require(`./${relativeRoute}`));
        });
        resolve(router);
      }
    });
  });
};

module.exports = Router;
