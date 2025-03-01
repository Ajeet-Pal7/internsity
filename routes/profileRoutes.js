const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');


router.post('/getProfile', profileController.getProfile);
router.post('/updatePersonalInfo', profileController.updatePersonalInfo);
router.post('/updateMatriculationDetails', profileController.updateMatriculationDetails);
router.post('/updateIntermediateDetails', profileController.updateIntermediateDetails);
router.post('/updateGraduationDetails', profileController.updateGraduationDetails);
router.post('/updateProfessionalInfo', profileController.updateProfessionalInfo);
router.post('/updateSkills', profileController.updateSkills);
router.post('/updateHobbiesAndInterests', profileController.updateHobbiesAndInterests);
router.post('/updateAchievementsAndAwards', profileController.updateAchievementsAndAwards);
router.post('/updateProjects', profileController.updateProjects);
router.post('/updateCertifications', profileController.updateCertifications);
router.post('/updateProfilePicture', profileController.updateProfilePicture);
router.post('/getProfilePicture', profileController.getProfilePicture);

module.exports = router;
