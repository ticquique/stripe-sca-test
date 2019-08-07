const Opinion = require('../models/opinion');
const findable = require('./methods/findable');
const creable = require('./methods/creable');

class OpinionService {

  constructor() {}

  async find(page = 1, perPage = 20, resource, sort, filter, projection, populate, lean, aggregate) {
    return await findable(Opinion, page, perPage, resource, sort, filter, projection, populate, lean, aggregate);
  }

  async create(opinion, populate) {
    return await creable(Opinion, opinion, populate);
  }

}

module.exports = OpinionService;
