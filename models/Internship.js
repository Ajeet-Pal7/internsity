const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    appliedOn: { type: Date, required: true },
    endedAt: { type: Date, required: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    experience: { type: String, required: true },
    salary: { type: Number, required: true },
    deadline: { type: Date, required: true },
    imageURL: { type: [String], required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    category: { type: [String], required: true },
    skills: { type: [String], required: true },
    created_By: { type: String, required: true }
});

const Internship = mongoose.model("Internship", internshipSchema);
module.exports = { Internship }