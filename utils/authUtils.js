
const validator = require('validator');

exports.isEmailValid =(email) => {
    return validator.isEmail(email);
};
exports.generateId = async(User) => {
    const count = await User.countDocuments();
    return `IT${String(count + 1).padStart(9, '0')}`;

};