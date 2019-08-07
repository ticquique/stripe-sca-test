

const mongoose = require('mongoose');
const env = require('../env');

const mongooseLoader = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect('mongodb://mongo:27017', {
      auth: { user: env.db_user, password: env.db_password },
      useCreateIndex: true, useNewUrlParser: true, dbName: env.db_database,
    }).then(
      () => resolve('Connected to the db'),
      err => reject(err)
    );
  });
};

module.exports = mongooseLoader;
