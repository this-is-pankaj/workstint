'use strict';
const utils = require('../shared/utils');
const { info, debug, error } = require('../shared/logger');
const { validateRequest } = require('../validations');
const { addUser, loginUser, resetPassword } = require('../components/users.component');
const component = 'Users.Controller';

const methods = {};

methods.signup = async (req, res) => {
  const { reqId } = req;
  try {
    const reqBody = req.body;
    info(`${component}.signup.init`, reqId, reqBody);
    const vReport = validateRequest(reqBody, 'usersAPI', 'register');
    debug(`${component}.signup.validation`, reqId, vReport);
    if (!vReport.length) {
      const saveRes = await addUser(reqBody, reqId)
        .catch((err) => {
          error(`${component}.signup.addUser`, reqId, err);
          throw { status: err.status, msg: err.msg };
        });
      return utils.handleResponse(res, 200, null, saveRes);
    }
    return utils.handleResponse(res, 400, vReport, null);
  } catch (exc) {
    error(`${component}.signup.exception`, reqId, exc);
    utils.handleResponse(res, exc.status || 500, exc.msg || exc, null);
  }
};

methods.login = async (req, res) => {
  const { reqId } = req;
  try {
    const reqBody = req.body;
    info(`${component}.login.init`, reqId, reqBody);
    const vReport = validateRequest(reqBody, 'usersAPI', 'login');
    debug(`${component}.login.validation`, reqId, vReport);
    if (!vReport.length) {
      reqBody.usernameType = 'phone';
      if(reqBody.username?.includes('@')) {
        reqBody.usernameType = 'email';
      }
      const user = await loginUser(reqBody, reqId)
        .catch((err) => {
          error(`${component}.login.loginUser`, reqId, err);
          throw {status: err.status, msg: err.msg };
        });
      return utils.handleResponse(res, 200, null, user);
    }
    return utils.handleResponse(res, 400, vReport, null);
  } catch(exc) {
    error(`${component}.login.exception`, reqId, exc);
    utils.handleResponse(res, exc.status || 500, exc.msg || exc, null);
  }
};

methods.resetPassword = async (req, res) => {
  const { reqId } = req;
  try {
    const reqBody = req.body;
    info(`${component}.resetPassword.init`, reqId, reqBody);
    const vReport = validateRequest(reqBody, 'usersAPI', 'resetPassword');
    debug(`${component}.resetPassword.validation`, reqId, vReport);
    if (!vReport.length) {
      const user = await resetPassword(reqBody, reqId)
        .catch((err) => {
          error(`${component}.resetPassword.updatePassword`, reqId, err);
          throw {status: err.status, msg: err.msg };
        });
      return utils.handleResponse(res, 200, null, {});
    }
    return utils.handleResponse(res, 400, vReport, null);
  } catch(exc) {
    error(`${component}.resetPassword.exception`, reqId, exc);
    utils.handleResponse(res, exc.status || 500, exc.msg || exc, null);
  }
};

module.exports = methods;