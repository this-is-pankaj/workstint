'use strict';
const utils = require('../shared/utils');
const { info, error } = require('../shared/logger');
const { headers } = require('../shared/constants');
const { validateUserSession } = require('../components/sessions.component');
const { decrypt } = require('../shared/utils');
const { validateRequest } = require('../validations');
const component = 'sessions.middleware';

module.exports = async (req, res, next) => {
  const { reqId } = req;
  try {
    const reqDataObj = {
      reqId,
      sessionId: req.headers[headers.session],
      userId: req.headers[headers.userId],
     };
    const v = validateRequest(reqDataObj, 'signedIn', 'common');
    info(component, reqId, v);
    if (!v.length) {
      req.sessionId = req.headers[headers.session];
      // decrypt userId for further use
      req.userId = decrypt(req.headers[headers.userId]);
      // Validate the user's sessionId
      const isSessionIdValid = await validateUserSession(reqId, req.userId, req.sessionId);
      info(component, reqId, `SessionID ${req.sessionId} validity: ${isSessionIdValid}`);
      if (isSessionIdValid) {
        return next();
      } else {
        utils.handleResponse(res, 403, 'Session no longer valid. Please sign in again.', null);
      }
    }
    utils.handleResponse(res, 403, v, null);
  } catch (exc) {
    error(`${component}.exception`, reqId, exc);
    utils.handleResponse(res, 500, 'Validation Error Exception', null);
  }
};
