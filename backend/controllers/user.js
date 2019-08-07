
const Logger = require('../lib/logger');
const UserService = require('../services/user');
const PaymentsService = require('../services/payment');
const paymentsService = new PaymentsService();
const userService = new UserService();
const findable = require('./methods/findable');
const autoBind = require('../lib/autobind');

class UserController {

  constructor(logger) {
    this.logger = logger || new Logger(__filename);
    autoBind(this);
  }

  async createUser(req, res, next) {
    const { username, email } = req.body;
    const customer = await paymentsService.createCustomer(username, email);
    const user = await userService.create({ ...req.body, stripe_id: customer.id });
    res.status(200).json(user);
    next();
  }

  async getUser(req, res, next) {
    const id = req.params.id;
    const user = (await userService.find(1, 1, { _id: id }))[0];
    res.status(200).json(user);
    next();
  }

  async getUsers(req, res, next) {
    const users = await findable(userService, req, res, next);
    res.status(200).json(users);
    next();
  }

}

module.exports = UserController;
