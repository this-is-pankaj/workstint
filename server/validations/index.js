'use strict';
const Validator = require('jsonschema').Validator;
const v = new Validator();
const { info, error } = require('../shared/logger');

const usersAPI = require('./users.validations');
const signedIn = require('./signedIn.validations');
const profileAPI = require('./profile.validation');
const component = 'Validations';
const validationSchemas = {
  usersAPI,
  signedIn,
  profileAPI,
};

const generateErrorsList = (vReport) => {
  return vReport.errors.map((e) => {
    const { schema, name, stack } = e;
    return schema.message?schema.message[name] : stack;
  });
};

const validateRequest = (obj, type, api) => {
  const schema = validationSchemas[type][api];
  const vReport = v.validate(obj, schema);
  info(`${component}`, obj.reqId, vReport);
  return generateErrorsList(vReport);
};

module.exports = {
  validateRequest,
};
