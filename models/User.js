const mongoose = require('mongoose');


const userSchema = new mongoose.Schema(
    {
        id: { type: String, unique:true, required:true },
        profilePhoto: { type: String },
        personalInfo: {
            fullName: { type: String, required: true },
            dateOfBirth: { type: String, required: true },
            gender: { type: String, required: true },
            phone: { type: String, required: true },
            email: { type: String, unique: true },
            address: { type: String, required: true },
            password: { type: String },
        },
        matriculationDetails: {
            matrixSchoolName: { type: String },
            matrixBoard: { type: String },
            matrixPercentage: { type: String },
            matrixPassingYear: { type: String },
        },
        intermediateDetails: {
            interSchoolName: { type: String },
            interBoard: { type: String },
            stream: { type: String },
            interPercentage: { type: String },
            interPassingYear: { type: String },
        },
        graduationDetails: {
            collegeName: { type: String },
            university: { type: String },
            course: { type: String },
            graduationPercentage: { type: String },
            yearOfCompletion: { type: String },
        },
        professionalInfo: {
            currentStatus: { type: String },
            objective: { type: String },
        },
        skills: {
            technicalSkills: { type: String },
            softSkills: { type: String },
        },
        hobbiesAndInterests: {
            personalInterest: { type: String },
            extracurricularActivities: { type: String },
        },
        achievementsAndAwards: {
            academicAchievements: { type: String },
            extracurricularAwards: { type: String },
            competitionsParticipated: { type: String },
        },
        projects: {
            projectTitle: { type: String },
            technologiesUsed: { type: String },
            roleInProject: { type: String },
            projectDescription: { type: String },
            outcomeOfProject: { type: String },
        },
        certifications: {
            certificationNames: { type: String },
            issuingAuthority: { type: String },
            dateOfCompletion: { type: String },
        },
        isEmailVerified: { type: Boolean, required: true },
        agreeWithTermsAndConditions:{type:Boolean, required:true},
        allowMSGOnWhatsApp:{type:Boolean, required:true}
    },
    { timestamps: true },
);


const User = mongoose.model("User", userSchema);

module.exports = { User };