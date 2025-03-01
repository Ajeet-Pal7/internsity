const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');


router.get('/about', pageController.about);
router.get('/profile', pageController.profile);
router.get('/contact-us', pageController.contactus);
router.get('/internships', pageController.internships);
router.get('/team', pageController.team);
router.get('/faq', pageController.faq);




module. exports = router;