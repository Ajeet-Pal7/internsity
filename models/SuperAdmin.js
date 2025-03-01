const { default: mongoose } = require('mongoose')
const baseAdmin = require('./baseAdmin')

const superadminSchema = new mongoose.Schema({
    permissions : {
        manageUsers: { type: Boolean, default: true },
        manageInternships: { type: Boolean, default: true },
        managePayments: { type: Boolean, default: true },
        manageSettings: { type: Boolean, default: true }
    }
});

const superadmin = baseAdmin.discriminator("superadmin", superadminSchema);
module.exports = superadmin;