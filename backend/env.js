const getOsEnv = require('./lib/osenv');
const apiVersion = 1;
const production = getOsEnv('PRODUCTION') || false;
const env = {
  app_protocol: production ? 'http' : 'http',
  app_domain: production ? getOsEnv('APP_DOMAIN_DEV') : getOsEnv('APP_DOMAIN_DEV'),
  app_port: production ? 4200 : 4200,
  api_url: 'http://localhost:3000',
  api_port: 3000,
  api_secret: 'Hello world',
  api_version: apiVersion,
  api_prefix: getOsEnv('APP_ROUTE_PREFIX') || 'api',
  db_user: getOsEnv('MONGO_USER') || 'admin',
  db_password: getOsEnv('MONGO_PASSWORD') || 'admin',
  db_database: getOsEnv('MONGO_DATABASE') || 'admin',
  log_level: production ? 'http' : 'debug',
  log_output: production ? 'tiny' : 'dev',
  allowed_origins: [getOsEnv('FRONT_URL') || 'localhost', 'localhost:4200', '127.0.0.1', 'angular', getOsEnv('APP_DOMAIN')],
  routes_dir: `api/route/v${apiVersion}/**/*.js`,
  revoqued_tokens: [],
  stripe_key: production ? getOsEnv('STRIPE_KEY') : getOsEnv('STRIPE_KEY_DEV'),
  stripe_uri: 'https://api.stripe.com/v1',
  email: {
    name: 'Byan King',
    user: 'brayan.king57@ethereal.email',
    password: 'XDQrHvbuDZsSMp4pkb',
    host: 'smtp.ethereal.email',
    port: 587
  }
};

module.exports = env;
