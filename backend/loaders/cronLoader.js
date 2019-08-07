

const cron = require('node-cron');
const env = require('../env');
const PaymentService = require('../services/payment');
const paymentService = new PaymentService();
const UserService = require('../services/user');
const userService = new UserService();
const MailerService = require('../services/mailer');
const mailerService = new MailerService();

const paymentsFun = async () => {
  const users = await userService.find();
  users.forEach(async user => {
    if (user.stripe_id && user.stripe_method) {
      const payment = await paymentService.createPaymentIntent(user.stripe_method, user.stripe_id, 100);
      mailerService.sendMail(user.email, payment, 'payments');
    }
  });
}

const cronLoader = () => {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      paymentsFun();
    }, 5000);
    // cron.schedule('* * * * *', paymentsFun);
    resolve('Cron enabled');
  });
};

module.exports = cronLoader;
