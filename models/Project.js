const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    batchid: { type: String, required: true },
    teamid: { type: String, required: true },
    name: { type: String, required: true },
    submitiondate: { type: Date, required: true },
    projecticon: { type: String, required: true },
    mentorid: { type: String, required: true },
    discription: { type: String },
    category: { type: String }
});

const Project = mongoose.model("Project", projectSchema);

module.exports = { Project }