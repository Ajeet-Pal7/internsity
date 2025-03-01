const { default: mongoose } = require('mongoose')
const baseAdmin = require('./baseAdmin')

const moderatorSchema = new mongoose.Schema({
    permissions : {
        manageUsers: { type: Boolean, default: false },
        manageInternships: { type: Boolean, default: true },
        managePayments: { type: Boolean, default: false },
        manageSettings: { type: Boolean, default: false }
    }
});

const Moderator = baseAdmin.discriminator("moderator", moderatorSchema);
module.exports = Moderator;