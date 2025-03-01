const mongoose = require("mongoose")

const teamSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    memberid: { type: [String], required: true },
    certificatedid: { type: [String], required: true },
    role: { type: [String] }
});

const Team = mongoose.model("Team", teamSchema);

module.exports = { Team }