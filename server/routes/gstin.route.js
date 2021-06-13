const express = require('express');
const gstinRouter = express.Router();
const gstinController = require('../controllers/gstin.controller');

gstinRouter.get('/', gstinController.getDetailsFromGSTIn);

module.exports = gstinRouter;
