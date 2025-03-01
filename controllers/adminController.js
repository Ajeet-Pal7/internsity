const { User } = require('../models/User');
const Admin = require('../models/Admin');
const superadmin = require('../models/SuperAdmin');
const Moderator = require('../models/Moderator');
const path = require('path');
const otherUtils = require('../utils/otherUtils');
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
            createdBy,
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
            } else if(created_by.role == "superadmin" && created_by.isActive){
                await superadmin.create(newAdmin);
                return res.json({"Success" : "created successfully"});
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