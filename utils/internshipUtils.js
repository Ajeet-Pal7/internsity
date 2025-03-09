const multer = require('multer')
const fs = require('fs')

// Set storage engine for uploaded files
const internshipPhotoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = './public/images/internships/';
        console.log("Body in Storage", req.body);
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        console.log("body in multer", req.body);
        console.log("file in multer", file);
        cb(null, `${file.originalname}`);
    }
});
// File upload filter (only images allowed)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Images only (jpeg, jpg, png)!"), false); // ✅ Proper error handling
    }
};


// Create the multer instance
// Upload function
exports.uploadInternshipPicture = multer({
    storage: internshipPhotoStorage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
    fileFilter: fileFilter
}).single('internshipImage');