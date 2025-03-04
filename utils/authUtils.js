
const validator = require('validator');

exports.isEmailValid =(email) => {
    return validator.isEmail(email);
};
exports.generateId = async(User) => {
    const count = await User.countDocuments();
    return `IT${String(count + 1).padStart(9, '0')}`;

};
exports.randStr = () => {
    return `IT${Math.random().toString(36).substring(2, 8)}`; // 6 random characters
};
