'use strict';

const signedInValidations = {
  common: {
    id: '/signedInCommonValidations',
    type: 'object',
    properties: {
      reqId: {
        type: 'string',
        required: true,
        message: {
          required: 'Request Tracking ID missing',
        },
      },
      userId: {
        type: 'string',
        required: true,
        message: {
          required: 'Invalid UserID',
        },
      },
      sessionId: {
        type: 'string',
        required: true,
        message: {
          required: 'Invalid app-sessionID',
        },
      },
    },
  },
};

module.exports = signedInValidations;
