const nodemailer = require('nodemailer');
require('dotenv').config();


const transporter = nodemailer.createTransport({
    host: process.env.BREVO_SMTP_HOST,
    port: Number(process.env.BREVO_SMTP_PORT),
    secure: process.env.BREVO_SMTP_SECURE === 'true',
    auth: {
        user: process.env.BREVO_SMTP_USER,  
        pass: process.env.BREVO_SMTP_KEY
    }
});
module.exports = transporter;
