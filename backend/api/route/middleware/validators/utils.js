const Joi = require('@hapi/joi');


/**
 * Middleware for validate requests, return null if not error or the error
 * @param {object} element to validate
 * @param {object} schema to validate against
 */
const validateJoi = async(element, schema) => {
  const { error, _ } = await Joi.validate(element, schema);
  return error;
};

/**
 * Common object structure to validate searchs
 */
class listSchema {

  constructor(extras) {
    this.page = Joi.number().min(1);
    this.perPage = Joi.number().min(1).max(100);
    this.resource = Joi.string();
    this.sort = Joi.string();
    this.filter = Joi.string();
    this.partial = Joi.bool();
    for (const extra in extras) {
      this[extra] = extras[extra];
    }
  }

}

/**
 * Common object structure to validate single element searchs
 */
class detailSchema {

  constructor(extras) {
    this.id = Joi.string().required();
    for (const extra in extras) {
      this[extra] = extras[extra];
    }
  }

}

module.exports.validateJoi = validateJoi;
module.exports.DetailSchema = detailSchema;
module.exports.ListSchema = listSchema;
