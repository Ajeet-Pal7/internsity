const mongoose = require("mongoose");

const baseAdminSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    gender: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    linkedin: { type: String, required: true, unique: true, default: "https://linkedin.com/company/internsity" },
    instagram: { type: String, required: true, unique: true, default: "https://instagram.com/internsity" },
    youtube: { type: String, required: true, default: "https://youtube.com/@internsity" },
    github: { type: String, required: true, default: "https://github.com/internsity" },
    profileImage: { type: String, default: "" },
    role: { type: String, enum: ["superadmin", "admin", "moderator"], required: true },
    isActive: { type: Boolean, default: false },
    lastLogin: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
    isVerified: { type: Boolean, default: false }
}, { discriminatorKey: 'role', collection: 'admins' });

const BaseAdmin = mongoose.model("BaseAdmin", baseAdminSchema);

module.exports = BaseAdmin;
