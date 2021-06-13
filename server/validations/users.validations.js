'use strict';
const { Validator } = require('jsonschema');
const v = new Validator();

const usersValidations = {
  register: {
    id: '/usersRegisterSchema',
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
        required: true,
        message: {
          type: 'Invalid Email typer',
          required: 'Email ID is mandatory',
          format: 'Invalid Email ID',
        },
      },
      phone: {
        type: 'string',
        pattern: '^\\d{10}$',
        required: true,
        message: {
          type: 'Invalid type for phone number',
          required: 'Phone number is mandatory',
          pattern: 'Invalid Phone Number',
        },
      },
      firstName: {
        type: 'string',
        pattern: '^\\w',
        required: true,
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
        required: true,
        message: {
          type: 'Invalid type for last name',
          required: 'Last Name is mandatory',
          pattern: 'Invalid Last Name',
        },
      },
      password: {
        type: 'string',
        required: true,
        message: {
          type: 'Invalid type for password',
          required: 'password is mandatory',
          pattern: 'Invalid password',
        },
      },
    },
  },
  login: {    
    id: '/usersLoginSchema',
    type: 'object',
    properties: {
      username: {
        type: 'string',
        required: true,
      },
      password: {
        type: 'string',
        required: true,
      },
      rememberMe: {
        type: 'boolean',
        required: true,
        default: false,
      },
    },
  },
  resetPassword: {
    id: '/usersForgotPwdSchema',
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
        required: true,
        message: {
          type: 'Invalid Email typer',
          required: 'Email ID is mandatory',
          format: 'Invalid Email ID',
        },
      },
      phone: {
        type: 'string',
        pattern: '^\\d{10}$',
        required: true,
        message: {
          type: 'Invalid type for phone number',
          required: 'Phone number is mandatory',
          pattern: 'Invalid Phone Number',
        },
      },
      password: {
        type: 'string',
        required: true,
      },
    },
  },
};

module.exports = usersValidations;
