const mongoose = require('mongoose');
const BaseAdmin = require('./baseAdmin'); 

const adminSchema = new mongoose.Schema({
    permissions: {
        manageUsers: { type: Boolean, default: true },
        manageInternships: { type: Boolean, default: true },
        managePayments: { type: Boolean, default: false },
        manageSettings: { type: Boolean, default: false }
    }
});

const Admin = BaseAdmin.discriminator("Admin", adminSchema);

module.exports = Admin;
