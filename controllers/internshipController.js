const { Internship } = require('../models/Internship');
const { Batch } = require('../models/Batch')
const path = require('path');
const otherUtils = require("../utils/otherUtils")


exports.internship = async (req, res) => {
    const category = req.query.category;
    // if (req.method === "GET") {
    let random_number = otherUtils.randomNumber(0, 4 + 1);
    random_number = 2;
    console.log("Random number : ", random_number);
    switch (random_number) {
        case 0:
            await otherUtils.sendFileWithFallback(
                res,
                path.join(__dirname, '../public', 'internship-00.html'),
                path.join(__dirname, '../public', 'error-404.html')
            );
            break;
        case 1:
            await otherUtils.sendFileWithFallback(
                res,
                path.join(__dirname, '../public', 'internship-01.html'),
                path.join(__dirname, '../public', 'error-404.html')
            );
            break;
        case 2:
            await otherUtils.sendFileWithFallback(
                res,
                path.join(__dirname, '../public', 'internship-02.html'),
                path.join(__dirname, '../public', 'error-404.html')
            );
            break;
        case 3:
            await otherUtils.sendFileWithFallback(
                res,
                path.join(__dirname, '../public', 'internship-03.html'),
                path.join(__dirname, '../public', 'error-404.html')
            );
            break;
        case 4:
            await otherUtils.sendFileWithFallback(
                res,
                path.join(__dirname, '../public', 'internship-04.html'),
                path.join(__dirname, '../public', 'error-404.html')
            );
            break;

        default:
            await otherUtils.sendFileWithFallback(
                res,
                path.join(__dirname, '../public', 'internship-01.html'),
                path.join(__dirname, '../public', 'error-404.html')
            );
    }
    // }
    console.log("Category : ", category);



}

exports.internshipData = async (req, res) => {
    console.log("Request received!!!");
    try {
        const category = req.query.category;
        const internships = await Internship.find({ status: "active", category });
        console.log(internships);
        return res.json(internships);
    } catch (error) {
        console.log("Error :", error);
        return res.status(400).json({ err: error });
    }
}

exports.apply = async (req, res) => {

    // return res.status(200).json({msg:"Requested success"});
    console.log("REQ Received");
    const applyFor = {
        id,
        email,
        applyingFor
    } = req.body
    console.log("Apply For", applyFor);
    const currentBatch = await Batch.findOne({ "status": "upcoming", "enrollment.students": applyFor.id })
    if (currentBatch) {
        console.log("Failed", currentBatch);
        return res.status(400).json({
            msg:"User already enrolled",
            currentBatch:currentBatch,
            enrolledIn:await Internship.findOne({"id":currentBatch.enrollment.enrolledIn})
        })
    }
    const result = await Batch.updateOne({ status: "upcoming" }, { $push: { "enrollment.students": applyFor.id, "enrolment.enrolledIn": applyFor.applyingFor } });
    if(result){
        console.log("Success", result);
        return res.status(200).json({
            msg:"Success",
            result:result,
            enrolledIn:await Internship.findOne({"id":applyFor.applyingFor})
        })
    }
};