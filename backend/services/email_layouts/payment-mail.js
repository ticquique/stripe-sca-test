// requires_action
// payment_intent_client_secret
// intent
// success
// error
const environment = require('../../env');

const paymentMail = (paymentIntent) => {

    const url = `${environment.app_protocol}://${environment.app_domain}:${environment.app_port}`;
    return ({
        text: paymentIntent.error ? `Payment could not be processed due to ${paymentIntent.error}` :
            paymentIntent.requires_action ? `Please follow the link to process the continue with the payment ${url}/payment/${paymentIntent.payment_intent_client_secret}` :
                paymentIntent.success ? `Successfully paid` : '',
        html: paymentIntent.error ? `Payment could not be processed due to ${paymentIntent.error}` :
            paymentIntent.requires_action ? `Please follow the link to process the continue with the payment ${url}/payment/${paymentIntent.payment_intent_client_secret}` :
                paymentIntent.success ? `Successfully paid` : '',
        subject: paymentIntent.error ? `Error processing payment` :
            paymentIntent.requires_action ? `Action required in payment` :
                paymentIntent.success ? `Successfully paid` : '',
    });
};
module.exports = paymentMail;
