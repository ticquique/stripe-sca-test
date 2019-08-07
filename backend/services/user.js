const User = require('../models/user');
const findable = require('./methods/findable');
const creable = require('./methods/creable');

class UserService {

  constructor() {}

  async find(page = 1, perPage = 20, resource, sort, filter, projection, populate, lean, aggregate) {
    return await findable(User, page, perPage, resource, sort, filter, projection, populate, lean, aggregate);
  }

  async create(user, populate) {
    return await creable(User, user, populate);
  }

  async update(id, user) {
    return await User.updateOne({ _id: id }, {$set: user });
  }

}

module.exports = UserService;
