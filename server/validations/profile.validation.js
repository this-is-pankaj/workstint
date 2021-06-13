'use strict';
const { Validator } = require('jsonschema');
const v = new Validator();

const profileValidations = {
  updateProfile: {
    id: '/usersForgotPwdSchema',
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
        message: {
          type: 'Invalid Email typer',
          required: 'Email ID is mandatory',
          format: 'Invalid Email ID',
        },
      },
      phone: {
        type: 'string',
        pattern: '^\\d{10}$',
        message: {
          type: 'Invalid type for phone number',
          required: 'Phone number is mandatory',
          pattern: 'Invalid Phone Number',
        },
      },
      firstName: {
        type: 'string',
        pattern: '^\\w',
        message: {
          type: 'Invalid type for first name',
          required: 'First Name is mandatory',
          pattern: 'Invalid First Name',
        },
      },
      middleName: {
        type: 'string',
        required: false,
      },
      lastName: {
        type: 'string',
        message: {
          type: 'Invalid type for last name',
          required: 'Last Name is mandatory',
          pattern: 'Invalid Last Name',
        },
      },
      gstin: {
        type: 'string',
        pattern: '^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$',
        message: {
          type: 'Invalid type for GST Number',
          required: 'GST Number is mandatory',
          pattern: 'Invalid GSTIN',
        },
      },
      tradeName: {
        type: 'string',
        message: {
          type: 'Invalid type for Trade name',
          required: 'Trade Name is mandatory',
          pattern: 'Invalid Trade Name',
        },
      },
      addresses: {
        type: 'array'
      },
    },
  },
};

module.exports = profileValidations;
