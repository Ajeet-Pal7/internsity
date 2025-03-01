const multer = require('multer')
const fs = require('fs')

// Set storage engine for uploaded files
const profilePhotoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = './uploads/profiles/';
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
    const allowedTypes = /jpeg|jpg|png/;
    const extName = allowedTypes.test(file.originalname.toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);
    if (extName && mimeType) {
        cb(null, true);
    } else {
        cb('Error: Images only (jpeg, jpg, png)!');
    }
};

// Create the multer instance
// Upload function
exports.uploadProfilePicture = multer({
    storage: profilePhotoStorage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
    fileFilter: fileFilter
}).single('profilePhoto');