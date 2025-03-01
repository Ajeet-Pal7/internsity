const path = require('path');
const otherUtils = require('../utils/otherUtils')

// Helper function to handle sending files with error fallback


// Exported route handlers
exports.about = async (req, res) => {
    otherUtils.sendFileWithFallback(
        res,
        path.join(__dirname, '../public', 'about-us.html'),
        path.join(__dirname, '../public', 'error-404.html')
    );
};

exports.profile = async (req, res) => {
    otherUtils.sendFileWithFallback(
        res,
        path.join(__dirname, '../public', 'profile.html'),
        path.join(__dirname, '../public', 'error-404.html')
    );
};

exports.contactus = async (req, res) => {
    otherUtils.sendFileWithFallback(
        res,
        path.join(__dirname, '../public', 'contact-us.html'),
        path.join(__dirname, '../public', 'error-404.html')
    );
};


exports.internships = async (req, res) => {
    otherUtils.sendFileWithFallback(
        res,
        path.join(__dirname, '../public', 'careers.html'),
        path.join(__dirname, '../public', 'error-404.html')
    );
};
exports.team = async (req, res) => {
    otherUtils.sendFileWithFallback(
        res,
        path.join(__dirname, '../public', 'team.html'),
        path.join(__dirname, '../public', 'error-404.html')
    );
};
exports.faq = async (req, res) => {
    otherUtils.sendFileWithFallback(
        res,
        path.join(__dirname, '../public', 'faq.html'),
        path.join(__dirname, '../public', 'error-404.html')
    );
};