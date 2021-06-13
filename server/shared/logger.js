'use strict';

const generateObj = (c, r, m) => {
  return {
    component: c,
    reqId: r,
    message: m,
  };
};

const info = (component, reqId, message) => {
  const msg = generateObj(component, reqId, message);
  console.log(`Info: ${JSON.stringify(msg)}`);
};

const debug = (component, reqId, message) => {
  const msg = generateObj(component, reqId, message);
  console.log(`==================== ${JSON.stringify(msg)}`);
};

const error = (component, reqId, message) => {
  const msg = generateObj(component, reqId, message);
  console.error(`Error: ${JSON.stringify(msg)}`);
};

module.exports = {
  info,
  debug,
  error,
};
