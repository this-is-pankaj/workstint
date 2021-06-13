'use strict';
const UsersModel = require('../model/user.model');
const { info, error } = require('../shared/logger');
const { encrypt } = require('../shared/utils');
const component = 'users.component';
const methods = {};

// Update the icnoming user object as per the schema.
const prepareDataAsPerSchema = (data) => {
  const obj = { ...data };
  // Check and prepare name object for a user
  if(!obj.name && obj.firstName) {
    const { firstName, middleName, lastName } = data;
    obj.name = {
      firstName,
      middleName,
      lastName,
    };
    delete obj.firstName;
    delete obj.middleName;
    delete obj.lastName;
  }
  // Find and encrypt passwords
  if(obj.password) {
    obj.password = encrypt(obj.password);
  }

  return obj;
};

const findUserWithFilter = async (filter, fieldsToReturn) => {
  try {
    const matchingUser = await UsersModel.findOne(filter, fieldsToReturn);
    return matchingUser;
  } catch(exc) {
    throw exc;
  }
};

const updateUser = async (filter, update) => {
  try {
    const options = {
      new: true,
    };

    const dataToBeUpdated = prepareDataAsPerSchema(update);

    const updatedUser = await UsersModel.findOneAndUpdate(filter, dataToBeUpdated, options);
    return updatedUser;
  } catch (exc) {
    throw exc;
  }
};

methods.updateUserDetails = async (userId, data, reqId) => {
  try {
    info(`${component}.updateUserDetails.init`, reqId, data);
    const q = {
      _id: userId,
    };

    const user = await updateUser(q, data);

    if (user) {
      return user;
    }
    throw { status: 204, msg: 'No profile found' };
  } catch(exc) {
    console.log(exc);
    error(`${component}.updateUserDetails.exception`, reqId, exc);
    throw { status: exc.status || 500, msg: exc.msg || exc };
  }
};

methods.getProfileInfo = async (reqId, userId) => {
  try {
    const q = {
      _id: userId,
    };

    const user = await findUserWithFilter(q);

    if (user) {
      info(`${component}.getProfileInfo.findUserWithFilter`, reqId, user);
      const userObj = user.toObject();
      userObj.id = encrypt(userObj._id.toString());
      delete userObj.password;
      delete userObj._id;
      delete userObj.__v;
      // generate Session token for the user
      return userObj;
    }
    throw { status: 204, msg: 'No profile found' };
  } catch(exc) {
    error(`${component}.getProfileInfo.exception`, reqId, exc);
    throw { status: exc.status || 500, msg: exc.msg || exc };
  }
};

module.exports = methods;