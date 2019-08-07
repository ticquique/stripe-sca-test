
const Logger = require('../lib/logger');
const PaymentsService = require('../services/payment');
const UserService = require('../services/user');
const paymentsService = new PaymentsService();
const userService = new UserService();
const autoBind = require('../lib/autobind');

class UserController {

  constructor(logger) {
    this.logger = logger || new Logger(__filename);
    autoBind(this);
  }

  async createCustomer(req, res, next) {
    const { payment_method_id, phone, email, description } = req.body;
    const userId = res.locals.user.sub;
    const user = await userService.find(1, 1, { _id: userId })[0];
    const customer = await paymentsService.createCustomer(user.username, payment_method_id, phone, email, description);
    res.status(200).json(customer);
    next();
  }

  async createSetupIntent(req, res, next) {
    const setupIntent = await paymentsService.createSetupIntent();
    res.status(200).json(setupIntent);
    next();
  }

  async attachPaymentMethod(req, res, next) {
    const { payment_method_id } = req.body;
    let user = (await userService.find(1, 1, { _id: res.locals.user.sub }, null, null, null, null, true))[0];
    const paymentMethod = await paymentsService.attachPaymentMethod(payment_method_id, user.stripe_id);
    await userService.update(user._id, { stripe_method: paymentMethod.id });
    res.status(200).json(paymentMethod);
    next();
  }

  async createPaymentIntent(req, res, next) {
    const { payment_method, customer, amount, currency, confirmation_method, confirm } = req.body;
    const paymentIntent = await paymentsService.createPaymentIntent(payment_method, customer, amount, currency, confirmation_method, confirm);
    res.status(200).json(paymentIntent);
    next();
  }

  async confirmPaymentIntent(req, res, next) {
    const { payment_intent_id } = req.body;
    const paymentIntent = await paymentsService.confirmPaymentIntent(payment_intent_id);
    res.status(200).json(paymentIntent);
    next();
  }

}

module.exports = UserController;
