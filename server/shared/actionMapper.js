const config = require(`../../config/${process.env || 'local'}`);

module.exports = {
  getGstinDetails: {
    url: config.gstInfo.url,
    method: 'GET',
  },
};
