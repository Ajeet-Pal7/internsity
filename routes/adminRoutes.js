const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.route('/users')
    .get(adminController.getUsers);

router.route('/user-profiles')
    .get(adminController.getUserProfilePhoto);

router.route('/admin')
    .post(adminController.newAdmin);

module.exports = router;