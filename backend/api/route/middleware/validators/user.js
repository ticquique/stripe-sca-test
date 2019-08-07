const Joi = require('@hapi/joi');
const { validateJoi, DetailSchema, ListSchema } = require('./utils');

/**
 * Middleware for validate create user endpoint
 */
module.exports.createUserValidator = (req, res, next) => {
  const schema = {
    username: Joi.string().min(3).max(80).required(),
    password: Joi.string().min(3).max(80).required(),
    email: Joi.string().min(3).max(80).required(),
  };
  validateJoi(req.body, schema).then(err => err ? next(err) : next());
};


/**
 * Middleware for validate get user endpoint
 */
module.exports.getUserValidator = (req, res, next) => {
  const schema = new DetailSchema();
  validateJoi(req.params, schema).then(err => err ? next(err) : next());
};


/**
 * Middleware for validate get users endpoint
 */
module.exports.getUsersValidator = (req, res, next) => {
  const schema = new ListSchema();
  validateJoi(req.params, schema).then(err => err ? next(err) : next());
};
