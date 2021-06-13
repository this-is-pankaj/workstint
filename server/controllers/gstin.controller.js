'use strict';

const { info, error } = require('../shared/logger');
const utils = require('../shared/utils');
const { fetchGSTDetails } = require('../components/gstin.component');
const component = 'gstin.controller';

const getDetailsFromGSTIn = async (req, res) => {
  const { reqId } = req;
  try {
    info(`${component}.init`, reqId, req.query);
    const { id } = req.query;
    const gstDetails = await fetchGSTDetails(reqId, id);
    info(`${component}.fetchGSTDetails`, reqId, gstDetails);
    return utils.handleResponse(res, 200, null, gstDetails);
  } catch(exc) {
    error(`${component}.getDetailsFromGSTIn.exception`, reqId, exc);
    utils.handleResponse(res, exc.status || 500, exc.msg || exc, null);
  }
};

module.exports = {
  getDetailsFromGSTIn,
};
