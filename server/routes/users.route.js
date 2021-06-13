const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/users.controllers');

usersRouter.post('/register', usersController.signup);
usersRouter.post('/login', usersController.login);
usersRouter.post('/forgot-password', usersController.resetPassword);

module.exports = usersRouter;