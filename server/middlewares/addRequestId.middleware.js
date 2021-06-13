'use strict';
const utils = require('../shared/utils');
const { error } = require('../shared/logger');
const component = 'AddRequestID.Middleware';

module.exports = (req, res, next) => {
  try {
    req.reqId = utils.generateUUID();
    next();
  } catch (exc) {
    error(`${component}.exception`, null, exc);
    utils.handleResponse(res, 500, 'Unable to generate the request ID.', null);
  }
};
