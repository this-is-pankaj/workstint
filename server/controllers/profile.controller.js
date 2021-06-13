const utils = require('../shared/utils');
const { info, debug, error } = require('../shared/logger');
const { validateRequest } = require('../validations');
const { updateUserDetails, getProfileInfo } = require('../components/profiles.component');
const component = 'profile.controller';

const updateUserProfile = async (req, res) => {
	const { reqId, userId } = req;
	try {
    const reqBody = req.body;
    info(`${component}.updateUserProfile.init`, reqId, reqBody);
    const vReport = validateRequest(reqBody, 'profileAPI', 'updateProfile');
    debug(`${component}.updateUserProfile.validation`, reqId, vReport);
    if (!vReport.length) {
      const user = await updateUserDetails(userId, reqBody, reqId)
        .catch((err) => {
          error(`${component}.updateUserProfile.updateUserDetails`, reqId, err);
          throw {status: err.status, msg: err.msg };
        });
      return utils.handleResponse(res, 200, null, user);
    }
    return utils.handleResponse(res, 400, vReport, null);
	}
	catch (exc) {
		error(`${component}.logout`, reqId, exc);
		utils.handleResponse(res, 500, exc, null);
	}
};

const profileDetails = async (req, res) => {
	const { reqId, userId } = req;
  try {
    info(`${component}.profileDetails.init`, reqId, userId);
    const user = await getProfileInfo(reqId, userId)
      .catch((err) => {
        error(`${component}.profileDetails.updateUserDetails`, reqId, err);
        throw {status: err.status, msg: err.msg };
      });
    return utils.handleResponse(res, 200, null, user);
  } catch(exc) {
    console.log(exc);
		error(`${component}.profileDetails.exception`, reqId, exc);
		utils.handleResponse(res, 500, exc, null);
  }
};

module.exports = {
  updateUserProfile,
  profileDetails,
};
