const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    startdate: { type: String, required: true },
    enddate: { type: String, required: true },
    status: { type: String, required: true },
    enrollment:{
        students:{type:[String]},
        enrolledIn:{type:[String]}
    },
    totalprojects: { type: Number },
    totalteams: { type: Number },
    imageURL: { type: String }
});
// {"id":"IT000000001", "name":"Alpha Batch", "startdate":"01 Feb, 2025", "enddate":"30 Apr, 2025", "status":"upcoming", "enrollment.students":"IT000000002", "enrollment.enrolledIn":"INT-2025-01-0001", "totalprojects":10, "totalteams":9, "imageURL":"../images/public/"}
const Batch = mongoose.model("Batch", batchSchema);

module.exports = { Batch };