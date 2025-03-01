const { User } = require('../models/User');
const path = require('path');
const profileUtils = require('../utils/profileUtils');

exports.getProfile = async (req, res) => {
    const user = req.body;
    console.log("Request received");
    const data = await User.findOne({ "personalInfo.email": user.email });
    if (!data) return res.status(404).json({ error: "User not found" });

    return res.status(200).json(data)
};

exports.updatePersonalInfo = async (req, res) => {
    const personalInfo = {
        fullName,
        dateOfBirth,
        phone,
        email,
        address,
    } = req.body;
    try {
        const user = await User.updateOne({ 'personalInfo.email': personalInfo.email }, { $set: { "personalInfo.fullName": personalInfo.fullName, "personalInfo.dateOfBirth": personalInfo.dateOfBirth, "personalInfo.phone": personalInfo.phone, "personalInfo.address": personalInfo.address } });
        return res.status(202).json({ msg: "Updated Successfully" });
    } catch (error) {
        return res.status(400).json({ err: "failed to update", error: "Failed to update" });
    }
};
exports.updateMatriculationDetails = async (req, res) => {
    const matriculationDetails = {
        email,
        matrixSchoolName,
        matrixBoard,
        matrixPercentage,
        matrixPassingYear,
    } = req.body;
    try {
        console.log("Matriculation Details: ", matriculationDetails)
        const user = await User.updateOne({ "personalInfo.email": matriculationDetails.email }, { $set: { "matriculationDetails.matrixSchoolName": matriculationDetails.matrixSchoolName, "matriculationDetails.matrixBoard": matriculationDetails.matrixBoard, "matriculationDetails.matrixPercentage": matriculationDetails.matrixPercentage, "matriculationDetails.matrixPassingYear": matriculationDetails.matrixPassingYear } });
        console.log(user)
        return res.status(202).json({ msg: "Updated Successfully" });
    } catch (err) {
        return res.status(400).json({ err: "failed to update", error: "Failed to update" });
    }
};
exports.updateIntermediateDetails = async (req, res) => {
    const intermediateDetails = {
        email,
        interSchoolName,
        interBoard,
        stream,
        interPercentage,
        interPassingYear,
    } = req.body;
    try {
        console.log("Intermediate Details: ", intermediateDetails)
        const user = await User.updateOne({ "personalInfo.email": intermediateDetails.email }, { $set: { "intermediateDetails.interSchoolName": intermediateDetails.interSchoolName, "intermediateDetails.interBoard": intermediateDetails.interBoard, "intermediateDetails.interPercentage": intermediateDetails.interPercentage, "intermediateDetails.stream": intermediateDetails.stream, "intermediateDetails.interPassingYear": intermediateDetails.interPassingYear } });
        console.log(user)
        return res.status(202).json({ msg: "Updated Successfully" });
    } catch (err) {
        return res.status(400).json({ err: "failed to update", error: "Failed to update" });
    }
};
exports.updateGraduationDetails = async (req, res) => {
    const graduationDetails = {
        email,
        collegeName,
        university,
        course,
        graduationPercentage,
        yearOfCompletion,
    } = req.body;
    try {
        console.log("Graduation Details: ", graduationDetails)
        const user = await User.updateOne({ "personalInfo.email": graduationDetails.email }, { $set: { "graduationDetails.collegeName": graduationDetails.collegeName, "graduationDetails.university": graduationDetails.university, "graduationDetails.course": graduationDetails.course, "graduationDetails.graduationPercentage": graduationDetails.graduationPercentage, "graduationDetails.yearOfCompletion": graduationDetails.yearOfCompletion } });
        console.log(user)
        return res.status(202).json({ msg: "Updated Successfully" });
    } catch (err) {
        return res.status(400).json({ err: "failed to update", error: "Failed to update" });
    }
};
exports.updateProfessionalInfo = async (req, res) => {
    const professionalInfo = {
        email,
        currentStatus,
        objective,
    } = req.body;
    try {
        console.log("Professional Details: ", professionalInfo)
        const user = await User.updateOne({ "personalInfo.email": professionalInfo.email }, { $set: { "professionalInfo.currentStatus": professionalInfo.currentStatus, "professionalInfo.objective": professionalInfo.objective } });
        console.log(user)
        return res.status(202).json({ msg: "Updated Successfully" });
    } catch (err) {
        return res.status(400).json({ err: "failed to update", error: "Failed to update" });
    }
};
exports.updateSkills = async (req, res) => {
    const skills = {
        email,
        technicalSkills,
        softSkills,
    } = req.body;
    try {
        console.log("Skills Details: ", skills)
        const user = await User.updateOne({ "personalInfo.email": skills.email }, { $set: { "skills.technicalSkills": skills.technicalSkills, "skills.softSkills": skills.softSkills } });
        console.log(user)
        return res.status(202).json({ msg: "Updated Successfully" });
    } catch (err) {
        return res.status(400).json({ err: "failed to update", error: "Failed to update" });
    }
};
exports.updateHobbiesAndInterests = async (req, res) => {
    const hobbiesAndInterests = {
        email,
        personalInterest,
        extracurricularActivities,
    } = req.body;
    try {
        console.log("Hobbies and Interests : ", hobbiesAndInterests)
        const user = await User.updateOne({ "personalInfo.email": hobbiesAndInterests.email }, { $set: { "hobbiesAndInterests.personalInterest": hobbiesAndInterests.personalInterest, "hobbiesAndInterests.extracurricularActivities": hobbiesAndInterests.extracurricularActivities } });
        console.log(user)
        return res.status(202).json({ msg: "Updated Successfully" });
    } catch (err) {
        return res.status(400).json({ err: "failed to update", error: "Failed to update" });
    }
};
exports.updateAchievementsAndAwards = async (req, res) => {
    const achievementsAndAwards = {
        email,
        academicAchievements,
        extracurricularAwards,
        competionsParticipated,
    } = req.body;
    try {
        console.log("Achievements and Awards : ", achievementsAndAwards)
        const user = await User.updateOne({ "personalInfo.email": achievementsAndAwards.email }, { $set: { "achievementsAndAwards.academicAchievements": achievementsAndAwards.academicAchievements, "achievementsAndAwards.extracurricularAwards": achievementsAndAwards.extracurricularAwards, "achievementsAndAwards.competionsParticipated": achievementsAndAwards.competionsParticipated } });
        console.log(user)
        return res.status(202).json({ msg: "Updated Successfully" });
    } catch (err) {
        return res.status(400).json({ err: "failed to update", error: "Failed to update" });
    }
};
exports.updateProjects = async (req, res) => {
    const projects = {
        email,
        projectTitle,
        technologiesUsed,
        roleInProject,
        projectDescription,
        outcomeOfProject,
    } = req.body;
    try {
        console.log("Projects : ", projects)
        const user = await User.updateOne({ "personalInfo.email": projects.email }, { $set: { "projects.projectTitle": projects.projectTitle, "projects.technologiesUsed": projects.technologiesUsed, "projects.roleInProject": projects.roleInProject, "projects.projectDescription": projects.projectDescription, "projects.outcomeOfProject": projects.outcomeOfProject } });
        console.log(user)
        return res.status(202).json({ msg: "Updated Successfully" });
    } catch (err) {
        return res.status(400).json({ err: "failed to update", error: "Failed to update" });
    }
};
exports.updateCertifications = async (req, res) => {
    const certifications = {
        email,
        certificationNames,
        issuingAuthority,
        dateOfCompletion,
    } = req.body;
    try {
        console.log("Certificates : ", certifications)
        const user = await User.updateOne({ "personalInfo.email": certifications.email }, { $set: { "certifications.certificationNames": certifications.certificationNames, "certifications.issuingAuthority": certifications.issuingAuthority, "certifications.dateOfCompletion": certifications.dateOfCompletion } });
        console.log(user)
        return res.status(202).json({ msg: "Updated Successfully" });
    } catch (err) {
        return res.status(400).json({ err: "failed to update", error: "Failed to update" });
    }
};
exports.updateProfilePicture = async (req, res) => {
    await profileUtils.uploadProfilePicture(req, res, async (err) => {
        if (err) {
            console.error("Multer error:", err);
            return res.status(400).json({ msg: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a profile photo!' });
        }
        const filePath = `../uploads/profiles/${req.file.originalname}`;
        try {

            const { email } = req.body; // Email will be in `req.body`
            req.body.email = email;
            const user = await User.updateOne(
                { "personalInfo.email": email },
                { $set: { "profilePhoto": filePath } } // Ensure this matches your schema
            );
            console.log(user);
            if (user.matchedCount === 0) {
                return res.status(404).json({ msg: "User not found" });
            }

            console.log("Successfully updated profile");
            return res.status(202).json({ msg: "Profile picture updated successfully", filePath });
        } catch (error) {
            console.error("Error:", error);
            return res.status(500).json({ msg: "Internal server error" });
        }
    });
};
exports.getProfilePicture = async (req, res) => {
    const id = req.body;
    res.sendFile(path.join(__dirname, '../uploads/profiles', `${id.id}.jpg`), (err) => {
        if (err) {
            res.sendFile(path.join(__dirname, '../uploads/profiles', `${id.id}.jpeg`), (err) => {
                if (err) {
                    res.sendFile(path.join(__dirname, '../uploads/profiles', `${id.id}.png`), (err) => {
                        if (err) {
                            console.log("No files found");
                            console.log(path.join(__dirname, '../uploads/profiles', `${id.id}.png`));
                            res.sendFile(path.join(__dirname, '../public', 'error-404.html'));
                        }
                    });
                }
            });
        }
    });
};