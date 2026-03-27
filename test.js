const nodemailer = require('nodemailer');

require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASS
    }
});

const mailOptions = {
    from: process.env.USER_EMAIL,
    to: 'ajeetbca2022@gmail.com',
    subject: 'Internsity - Verify your Email',
    html: `
    <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                    <title>Internsity - Verify Your Email</title>
                </head>
                <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">

                    <div style="max-width: 500px; margin: 40px auto; background: #ffffff; border-radius: 10px; 
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); overflow: hidden; padding: 20px; text-align: center;">

                        <div style="background: #007bff; color: #fff; padding: 15px; font-size: 24px; font-weight: bold;">
                            INTERNSITY
                        </div>

                        <div style="padding: 20px; font-size: 16px; color: #333;">
                            <p>Hello <strong> {newUser.personalInfo.fullName} </strong>,</p>
                            <p>Thank you for registering with Internsity! Please verify your email by clicking the button below.</p>

                            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 15px 0; text-align: center;">
                                <p style="margin: 5px 0; font-size: 14px; color: #555;"><strong>Verification Link:</strong></p>
                                <a href="{process.env.APP_URL}auth/verify/{token}"
                                    style="display: inline-block; padding: 12px 20px; background: #007bff; color: #fff; text-decoration: none; 
              font-size: 16px; border-radius: 5px; margin-top: 15px; transition: 0.3s;">
                                    Verify Email
                                </a>
                            </div>

                            <p>If you didn’t request this, please ignore this email.</p>
                        </div>

                        <div style="font-size: 12px; color: #777; padding: 15px; text-align: center;">
                            © 2025 Internsity. All rights reserved.
                        </div>

                    </div>

                </body>
            </html>
            `


}

transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    else console.log('Email sent: ' + info.response);
});