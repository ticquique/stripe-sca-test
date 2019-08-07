
const Router = require('../api/route/router');
const env = require('../env');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const methodOverride = require('method-override');
const morgan = require('morgan');
const Logger = require('../lib/logger');


const expressLoader = () => {
  return new Promise(async(resolve, reject) => {
    try {
      const log = new Logger(__filename);
      const router = await Router();
      const app = express();
      // io.origins(env.app.allowedOrigins);
      app.use(compression());
      app.use(bodyParser.json({ type: 'application/json' }));
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(methodOverride());
      app.use(morgan(env.log_output, { stream: { write: log.http.bind(log) } }));
      app.use(cors({
        origin: '*',
        optionsSuccessStatus: 200,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      }));
      app.use(helmet({ hidePoweredBy: true, frameguard: true, noSniff: true }));
      app.use(router);
      app.listen(env.api_port, () => {
        resolve(`App is running at ${env.api_url}`);
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = expressLoader;
