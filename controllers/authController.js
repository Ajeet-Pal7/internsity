const { User } = require("../models/User")
const authUtils = require('../utils/authUtils')
const bcrypt = require('bcrypt')
const path = require('path')
const jwt = require('jsonwebtoken')
const transporter = require('../transporter')
const otherUtils = require('../utils/otherUtils')



exports.login = async (req, res) => {
    if (req.method === 'GET') {
        await otherUtils.sendFileWithFallback(
            res,
            path.join(__dirname, '../public', 'login.html'),
            path.join(__dirname, '../public', 'error-404.html')
        );
    }
    else if (req.method === 'POST') {
        const { email, passwd } = req.body;
        try {
            // Input validation
            if (!email || !passwd || !authUtils.isEmailValid(email))
                return res.status(400).json({ error: 'Email and password are required' });

            // Find user by email
            const user = await User.findOne({ "personalInfo.email": email });
            if (!user)
                return res.status(404).json({ error: 'User not found' });

            // Verify passwords
            const isPasswordValid = bcrypt.compare(passwd, user.personalInfo.password)
            if (isPasswordValid) {
                console.log("success");
                res.status(201).json({
                    msg: "success",
                    user: { id: user.id, email: user.personalInfo.email },
                });
            }
        } catch (err) {
            return res.status(400).json({ err: 'something went wrong' });
        }

    }
};



exports.register = async (req, res) => {
    if (req.method === 'GET') {
        await otherUtils.sendFileWithFallback(
            res,
            path.join(__dirname, '../public', 'register.html'),
            path.join(__dirname, '../public', 'error-404.html')
        );
    }
    else if (req.method === 'POST') {

        req.body.id = await authUtils.generateId(User);

        try {
            const user = {
                id,
                profilePhoto,
                personalInfo: {
                    fullName,
                    dateOfBirth,
                    gender,
                    phone,
                    email,
                    address,
                    password,
                },
                matriculationDetails: {
                    matrixSchoolName,
                    matrixBoard,
                    matrixPercentage,
                    matrixPassingYear,
                },
                intermediateDetails: {
                    interSchoolName,
                    interBoard,
                    stream,
                    interPercentage,
                    interPassingYear,
                },
                graduationDetails: {
                    collegeName,
                    university,
                    course,
                    graduationPercentage,
                    yearOfCompletion,
                },
                professionalInfo: {
                    currentStatus,
                    objective,
                },
                skills: {
                    technicalSkills,
                    softSkills,
                },
                hobbiesAndInterests: {
                    personalInterest,
                    extracurricularActivities,
                },
                achievementsAndAwards: {
                    academicAchievements,
                    extracurricularAwards,
                    competitionsParticipated,
                },
                projects: {
                    projectTitle,
                    technologiesUsed,
                    roleInProject,
                    projectDescription,
                    outcomeOfProject,
                },
                certifications: {
                    certificationNames,
                    issuingAuthority,
                    dateOfCompletion,
                },
                isEmailVerified,
            } = req.body;

            if (!authUtils.isEmailValid(email)) {
                return res.status(400).json({ error: 'Invalid email format.' });
            }

            // if (!isPasswordValid(password)) {
            //     return res.status(400).json({ error: 'Password must be at least 8 characters long, with at least one letter and one number.' });
            // }

            // Check if the email already exists in the database
            const existingUser = await User.findOne({ where: { email } });

            if (existingUser) {
                return res.status(409).json({ error: 'Email is already registered.' });
            }
            console.log("Req received", user);
            // Register the user
            const newUser = await User.create(user);
            console.log("Req received");
            const token = jwt.sign(
                { id: newUser._id, email: newUser.personalInfo.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            const mailOptions = {
                from: process.env.USER_EMAIL,
                to: newUser.personalInfo.email,
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
                                        <p>Hello <strong> ${newUser.personalInfo.fullName} </strong>,</p>
                                        <p>Thank you for registering with Internsity! Please verify your email by clicking the button below.</p>

                                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 15px 0; text-align: center;">
                                            <p style="margin: 5px 0; font-size: 14px; color: #555;"><strong>Verification Link:</strong></p>
                                            <a href="${process.env.APP_URL}auth/verify/${token}"
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
            try {
                await transporter.sendMail(mailOptions);  // Use await
                res.status(201).json({
                    msg: "User registered successfully and we've sent you a verification mail",
                    user: { id: newUser._id, email: newUser.personalInfo.email },
                    token,
                });
            } catch (error) {
                console.error("Mail error:", error);
                res.status(201).json({
                    msg: "User registered successfully but failed to send verification mail",
                    user: { id: newUser._id, email: newUser.personalInfo.email },
                    token
                });

                try {
                    await transporter.sendMail(mailOptions);  // Use await
                    res.status(201).json({
                        msg: "User registered successfully and we've sent you a verification mail",
                        user: { id: newUser._id, email: newUser.personalInfo.email },
                        token,
                    });
                } catch (error) {
                    console.error("Mail error:", error);
                    res.status(201).json({
                        msg: "User registered successfully but failed to send verification mail",
                        user: { id: newUser._id, email: newUser.personalInfo.email },
                        token,
                    });
                }

            }
        } catch (err) {
            res.status(500).send({ error: err.message });
        }

    }
    
};

// Email verification method 
exports.verifyEmail = async (req, res) => {
    const { token } = req.params;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email;
        const pass = authUtils.randStr();
        // Hash the password
        const hashedPassword = await bcrypt.hash(pass, 10);
        let user = await User.updateOne({ "personalInfo.email": email }, { $set: { "isEmailVerified": "true", "personalInfo.password": hashedPassword } });
        if (user[0] === 0) {
            return res.status(404).send('User not found or already verified.');
        }
        user = await User.findOne({ "personalInfo.email": email })
        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: 'Thank you for verification',
            html: `
                    <html>
                        <head>
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                                    <title>Internsity - Email Verification</title>
                                </head>
                                <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 10; padding: 2;">
                                    <div style="max-width: 500px; margin: 40px auto; background: #ffffff; border-radius: 10px; 
                            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); overflow: hidden; padding: 20px; text-align: center;">
                                        <div style="background: linear-gradient(to right, #007bff, #0056b3); color: #fff; padding: 15px; font-size: 24px; font-weight: bold;">
                                            <div class="header">
                                                INTERNSITY
                                            </div>
                                        </div>
                                        <div style="padding: 20px; font-size: 16px; color: #333;">
                                            <p>Hello <strong>${user.personalInfo.fullName}</strong>,</p>
                                            <p>Thank you for verifying your email. Here are your login details:</p>
                                            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
                                                <p><strong>Email:</strong> ${email} </p>
                                                <p><strong>Password:</strong> ${pass} </p>
                                            </div>
                                            <p>If you need to reset your password, click the button below:</p>
                                            <a href="${process.env.APP_URL}/auth/login" style="display:inline-block; padding:12px 20px; background:#007bff; 
                                          color:#fff; text-decoration:none; font-size:16px; 
                                          border-radius:5px; margin-top:15px;">Login</a>
                                            <a href="#" style="display:inline-block; padding:12px 20px; background:#007bff; 
                                          color:#fff; text-decoration:none; font-size:16px; 
                                          border-radius:5px; margin-top:15px;">Reset Password</a>
                                            <p>If you didn't request this, please ignore this email.</p>
                                        </div>
                                        <div style="font-size: 12px; color: #777; padding: 15px; text-align: center;">
                                            &copy; 2025 Internsity. All rights reserved.
                                        </div>
                                    </div>
                                </body>
                            </html>`

        }


        await transporter.sendMail(mailOptions);
        res.status(200).send('Email verified successfully!');


    } catch (error) {

        console.error('Verification Error:', error);
        res.status(400).send('Invalid or expired token.');
    }
}
