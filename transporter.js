const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    // service: 'gmail',
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // True for 465, false for 587
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASS,
    },
});
module.exports = transporter;