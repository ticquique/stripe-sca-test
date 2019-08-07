const request = require('request');
const environment = require('../env');
const autoBind = require('../lib/autobind');

class PaymentsService {

    constructor() {
        this.stripeUri = `${environment.stripe_uri}`;
        this.auth = { sendImmediately: false, user: environment.stripe_key, pass: '' };
        autoBind(this);
    }



    async createCustomer(name, email, payment_method_id, phone, description) {
        let body = {
            ...payment_method_id ? { payment_method_id } : {},
            ...name ? { name } : {},
            ...phone ? { phone } : {},
            ...email ? { email } : {},
            ...description ? { description } : name ? { description: `Customer for user ${name}` } : {}
        };

        body = Object.entries(body).map(([key, value]) => `${key}=${value}`).join('&');
        const customersUri = `${this.stripeUri}/customers`;
        return new Promise((resolve, reject) => {
            request.post(customersUri, { body, auth: this.auth }, (err, res) => {
                if (err) reject(err);
                resolve(JSON.parse(res.body));
            });
        });
    }

    async createSetupIntent() {
        const intentUri = `${this.stripeUri}/setup_intents`;
        return new Promise((resolve, reject) => {
            request.post(intentUri, { body: 'usage=off_session', auth: this.auth }, (err, res) => {
                if (err) reject(err);
                resolve(JSON.parse(res.body));
            });
        });
    }

    // curl https://api.stripe.com/v1/payment_methods/{{PAYMENT_METHOD_ID}}/attach  -u sk_test_ywDI6kmITbJzazg5Cny2SQ6Y: -d customer="{{CUSTOMER_ID}}"
    async attachPaymentMethod(payment_method_id, customer_id) {
        const paymentMethodUri = `${this.stripeUri}/payment_methods/${payment_method_id}/attach`;
        return new Promise((resolve, reject) => {
            request.post(paymentMethodUri, { body: `customer=${customer_id}`, auth: this.auth }, (err, res) => {
                if (err) reject(err);
                resolve(JSON.parse(res.body));
            });
        });
    }

    async createPaymentIntent(payment_method, customer, amount, currency = 'eur', confirmation_method = 'manual', confirm = true) {
        let body = { payment_method, customer, amount, currency, confirmation_method, confirm };
        body = Object.entries(body).map(([key, value]) => `${key}=${value}`).join('&');
        const paymentIntentUri = `${this.stripeUri}/payment_intents`;
        return new Promise((resolve, reject) => {
            request.post(paymentIntentUri, { body: body, auth: this.auth }, (err, res) => {
                if (err) reject(err);
                const response = this.generate_payment_response(JSON.parse(res.body));
                resolve(response);
            });
        });
    }

    async confirmPaymentIntent(payment_intent) {
        const paymentIntentUri = `${this.stripeUri}/payment_intents/${payment_intent}/confirm`;
        return new Promise((resolve, reject) => {
            request.post(paymentIntentUri, { auth: this.auth }, (err, res) => {
                if (err) reject(err);
                const response = this.generate_payment_response(JSON.parse(res.body));
                resolve(response);
            });
        });
    }

    generate_payment_response(intent) {
        if (
            (intent.status === 'requires_action' || intent.status === 'requires_source_action') &&
            intent.next_action.type === 'use_stripe_sdk'
        ) {
            return ({
                requires_action: true,
                payment_intent_client_secret: intent.client_secret,
                intent
            });
        } else if (intent.status === 'succeeded') {
            return ({ success: true, intent });
        } else {
            return ({ error: 'Invalid PaymentIntent status', intent });
        }
    };


}

module.exports = PaymentsService;
