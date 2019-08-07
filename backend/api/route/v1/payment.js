const express = require('express');
const router = new express.Router();
// const { createUserValidator, getUserValidator, getUsersValidator } = require('../middleware/validators/user');
const authMiddleware = require('../middleware/auth');
const PaymentsController = require('../../../controllers/payment');
const paymentController = new PaymentsController();

router.route('/setup_intents')
.get(authMiddleware(), paymentController.createSetupIntent);

router.route('/payment_intent')
.post(authMiddleware(), paymentController.createPaymentIntent)

router.route('/confirm__payment_intent')
.post(authMiddleware(), paymentController.confirmPaymentIntent)

router.route('/attach_payment_method')
.post(authMiddleware(), paymentController.attachPaymentMethod)

module.exports = router;
