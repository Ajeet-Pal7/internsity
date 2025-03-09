const { User } = require('../models/User');
const Admin = require('../models/Admin');
const superadmin = require('../models/SuperAdmin');
const Moderator = require('../models/Moderator');
const Internship = require('../models/Internship');
const path = require('path');
const otherUtils = require('../utils/otherUtils');
const internshipUtils = require('../utils/internshipUtils');
const { param } = require('../routes/authRoutes');
const { permission } = require('process');
const { error } = require('console');
const { response } = require('express');

exports.getUsers = async (req, res) => {
    const users = await User.find({});
    return res.json(users);
}

exports.getUserProfilePhoto = async (req, res) => {
    const id = req.query.id;

    otherUtils.sendProfileWithFallback(
        res,
        path.join(__dirname, '../uploads', `profiles/${id}.png`),
        path.join(__dirname, '../uploads', `profiles/${id}.jpg`),
        path.join(__dirname, '../uploads', `profiles/${id}.jpeg`),
        path.join(__dirname, '../public', 'error-404.html')
    );
};

exports.newAdmin = async (req, res) => {
    try {
        const newAdmin = {
            id,
            name,
            email,
            gender,
            password,
            phone,
            linkedin,
            instagram,
            youtube,
            github,
            profileImage,
            role,
            isActive,
            lastLogin,
            createdAt,
            created_by,
            permissions: {
                manageUsers,
                manageInternships,
                managePayments,
                manageSettings,
            }
        } = req.body;

        if (newAdmin.createdBy == "") {
            return res.json({ "error": "Please login first" });
        }
        const created_by = await superadmin.findOne({ "email": newAdmin.createdBy });
        if (created_by) {
            if (created_by.role == "moderator") {
                return res.join({ "error": "Permission denied" });
            } else if (created_by.role == "admin" && created_by.isActive) {
                if (newAdmin.role == "moderator" && created_by.isActive) {
                    const result = await superadmin.create(admin);
                    return res.json({ "Success": "Created successfully" });
                } else if (newAdmin.role == "admin" && created_by.isActive) {
                    const result = await superadmin.create(admin);
                    return res.json({ "Success": "Created successfully" });
                } else if (newAdmin.role == "superadmin") {
                    return res.json({ "error": "Permission denied" });
                }
            } else if (created_by.role == "superadmin" && created_by.isActive) {
                await superadmin.create(newAdmin);
                return res.json({ "Success": "created successfully" });
            } else {
                return res.json({ "error": "You can not create accounts" })
            }
        } else {
            return res.json({ "error": "Permission denied" });
        }


    } catch (error) {
        console.log("Err : ", error);
        res.json(error);
    }

}


exports.newInternship = async (req, res) => {
    try {
        const internshipDetails = {
            id,
            title,
            appliedOn,
            endedAt,
            type,
            location,
            experience,
            salary,
            deadline,
            imageURL,
            description,
            status,
            category,
            skills,
            created_By
        } = req.body;

        console.log("Received file:", req.file);
        console.log("Received body:", req.body);

        try {

            await internshipUtils.uploadInternshipPicture(req, res, async (err) => {
                if (err) {
                    console.error("Multer error:", err);
                    return res.status(400).json({ msg: err.message });
                }
                if (!req.file) {
                    return res.status(400).json({ message: 'Please upload a Internship photo!' });
                }
                const filePath = `../public/images/internship/${req.file.originalname}`;
                internshipDetails.imageURL = [filePath];
                try {
                    const internship = await Internship.create(internshipDetails);
                    if (!internship) {
                        return res.status(404).json({ error: "Something went wrong" });
                    }

                    console.log("Successfully Created Internship");
                    return res.status(202).json({ msg: "New Internship created successfully" });
                } catch (error) {
                    console.error("Error:", error);
                    return res.status(500).json({ msg: "Internal server error" });
                }
            });
        } catch (error) {
            return res.json({ error: "Error while saving Image" });
        }

    } catch (error) {
        console.log("Error", error);
        return res.join({ error: "Something went wrong" });
    }


};