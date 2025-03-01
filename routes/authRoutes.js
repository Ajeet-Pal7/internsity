const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.route('/register')
    .get(authController.register)
    .post(authController.register);

router.route('/login')
    .get(authController.login)
    .post(authController.login);

router.route('/verify/:token')
    .get(authController.verifyEmail);
    
module.exports = router;