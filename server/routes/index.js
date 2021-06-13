'use strict';

const profileRouter = require('./profile.route');
const usersRouter = require('./users.route');
const gstinRouter = require('./gstin.route');

module.exports = {
  usersRouter,
  profileRouter,
  gstinRouter,
};
