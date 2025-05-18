const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    studentName: { type: String, required: true },
    uderid: { type: String, required: true },
    URL: { type: String, required: true },
    QRcode: { type: String, required: true },
    internshipId: { type: String, required: true },
    projectId: { type: [String], required: true }
});

const Certificate = mongoose.model("Certificate", certificateSchema);
module.exports = { Certificate };