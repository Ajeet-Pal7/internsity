const express = require('express');
const router = express.Router();
const internshipController = require('../controllers/internshipController');

router.route('/')
    .get(internshipController.internship);

router.route('/data')
    .get(internshipController.internshipData);

router.route('/apply')
    .post(internshipController.apply);
    

module.exports = router;