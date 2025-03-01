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
                subject: 'Verify your Email',
                html: "<h2>Hello " + newUser.personalInfo.fullName + ",</h2> <br/><p>Please verify your email by clicking on the link below:</p> <a href=\"${process.env.APP_URL}/verify/${token}\">Verify Email </a> <br/>" + process.env.APP_URL + "/verify/" + token,

            }
            try {
                transporter.sendMail(mailOptions);
                res.status(201).json({
                    msg: "User registered successfully and we've sent you a verification mail",
                    user: { id: newUser._id, email: newUser.personalInfo.email },
                    token,
                });
            } catch (error) {
                console.error('Mail error:', error);
                res.status(201).json({
                    msg: "User registered successfully but failed to send verification mail",
                    user: { id: newUser.id, email: newUser.personalInfo.email },
                    token,
                });
            }

        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    }
};


// Email verification route 
exports.verifyEmail = async (req, res) => {
    const { token } = req.params;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email;
        // Hash the password
        const hashedPassword = await bcrypt.hash("ITintern", 10);

        user = await User.updateOne({ "personalInfo.email": email }, { $set: { "isEmailVerified": "true", "personalInfo.password": hashedPassword } });
        if (user[0] === 0) {
            return res.status(404).send('User not found or already verified.');
        }
        user = await User.findOne({ "personalInfo.email": email })
        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: 'Thank you for verification',
            html: `<h2>Hello ${user.personalInfo.fullName},</h2> 
            <p>Thank you for confirming your email, here is your login credentials</p> 
            <p>Email : ${email}</p>
            <p>Password : ITintern</p>
            <button >Login</button>
            <button >Reset Password</button>`,
        }
        await transporter.sendMail(mailOptions)
        res.status(200).send('Email verified successfully!');


    } catch (error) {
        console.error('Verification Error:', error);
        res.status(400).send('Invalid or expired token.');
    }
};