'use strict';
const utils = require('../shared/utils');
const { info, error } = require('../shared/logger');
const { validateRequest } = require('../validations');
const component = 'Validation.Middleware';

module.exports = (req, res, next) => {
  const { reqId } = req;
  try {
    const reqDataObj = { ...req.body, ...req.query, ...req.params, reqId: req.reqId };
    const v = validateRequest(reqDataObj, 'signedIn', 'common');
    info(component, reqId, v);
    if (!v.length) {
      next();
    }
    utils.handleResponse(res, 400, v, null);
  } catch (exc) {
    error(`${component}.exception`, reqId, exc);
    utils.handleResponse(res, 500, 'Validation Error Exception', null);
  }
};
