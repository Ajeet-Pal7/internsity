const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');


router.route('/')
    .get(portfolioController.getBatches)
    .post(portfolioController.getBatches);

module.exports = router;
