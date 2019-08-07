const nodemailer = require("nodemailer");
const autoBind = require('../lib/autobind');
const environment = require('../env');
const paymentsMail = require('./email_layouts/payment-mail');

class EmailService {

    constructor() {
        this.mapMails = (type, txh, data) => {
            const mailsMap = { 'payments' : paymentsMail };
            return mailsMap[type] ? mailsMap[type](data)[txh] : '';
        }
        this.transporter = nodemailer.createTransport({
            host: environment.email.host,
            port: environment.email.port,
            auth: {
                user: environment.email.user,
                pass: environment.email.password
            }
        });
        autoBind(this);
    }

    async sendMail(mail_to, data, type, subject, text, html) {
        
        // send mail with defined transport object
        console.log(this.mapMails(type, 'text', data));
        return await this.transporter.sendMail({
            from: `"${environment.email.name} 👻" <${environment.email.user}>`, // sender address
            to: typeof mail_to === 'string' ? mail_to : mail_to.join(','), // list of receivers
            subject: subject ? subject : type ? this.mapMails(type, 'subject', data) : '', // Subject line
            text: text ? text : type ? this.mapMails(type, 'text', data) : '', // plain text body
            html: html ? html : type ? this.mapMails(type, 'html', data) : text // html body
        });
    }
}

module.exports = EmailService;
