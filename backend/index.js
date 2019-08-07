const expressLoader = require('./loaders/expressLoader');
const mongooseLoader = require('./loaders/mongooseLoader');
const cronLoader = require('./loaders/cronLoader');
const Logger = require('./lib/logger');
const log = new Logger(__filename);

const resolvePromises = async(promises) => {
  for (const promise of promises) {
    const result = await promise();
    log.info(result);
  }
};
const promises = [mongooseLoader, expressLoader, cronLoader];
resolvePromises(promises);
