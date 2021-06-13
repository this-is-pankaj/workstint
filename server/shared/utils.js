'use strict';
const uuid = require('uuid');
const crypto = require('crypto');
const axios = require('axios');

const algo = process.env.encrytionAlgo || 'aes128';
const encKey = process.env.encryptionKey || 'test';

const utils = {};
// Generates a unique UUID
const generateUUID = () => {
  return uuid.v4();
};

// Response Handler method. 
const handleResponse = (res, status, err, data) => {
  let obj = {
      data,
      err,
      status
  };

  res.status(status).send(obj);
};

const encryptDecrypt = {
  encrypt(text) {
      const cipher = crypto.createCipher(algo, encKey);
      let encrypted = cipher.update(text, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      return encrypted;
  },
  decrypt(text) {
      const decipher = crypto.createDecipher(algo, encKey);
      let decrypted = decipher.update(text, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
  },
};

const makeCall = async (action, qs, data) => {
  try {
    const { url, method } = '';
    const config = {

    };
    const res = await axios(config);
    return res.data.data;
  } catch(exc) {
    throw exc;
  }
};

module.exports = {
  generateUUID,
  handleResponse,
  encrypt: encryptDecrypt.encrypt,
  decrypt: encryptDecrypt.decrypt,
};
