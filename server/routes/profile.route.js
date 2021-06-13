const express = require('express');
const profileRouter = express.Router();
const profileController = require('../controllers/profile.controller');

profileRouter.put('/update', profileController.updateUserProfile);
profileRouter.get('/details', profileController.profileDetails);
module.exports = profileRouter;