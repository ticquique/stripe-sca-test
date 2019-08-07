const Joi = require('@hapi/joi');
const { validateJoi } = require('./utils');

/**
 * Middleware for validate authentication POST endpoint
 */
module.exports.getTokenValidator = (req, res, next) => {
  const schema = {
    username: Joi.string().min(3).max(80).required(),
    password: Joi.string().min(3).max(80).required(),
  };
  validateJoi(req.body, schema).then(err => err ? next(err) : next());
};
