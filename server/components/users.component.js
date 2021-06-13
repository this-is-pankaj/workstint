'use strict';
const UsersModel = require('../model/user.model');
const { info, error, debug } = require('../shared/logger');
const { encrypt } = require('../shared/utils');
const { addUserSession } = require('./sessions.component');
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

    const updatedUser = await UsersModel.findOneAndUpdate(filter, update, options);
    return updatedUser;
  } catch (exc) {
    throw exc;
  }
};

methods.addUser = async (data, reqId) => {
  try {
    info(`${component}.addUser.init`, reqId, data);
    const userInfo = prepareDataAsPerSchema(data);
    debug(`${component}.addUser.userInfo`, reqId, userInfo);
    const userInst = new UsersModel(userInfo);
    const savedUser = await userInst.save();
    info(`${component}.addUser.save`, reqId, savedUser);
    const savedUserObj = savedUser.toObject();
    savedUserObj.id = encrypt(savedUserObj._id.toString());
    delete savedUserObj._id;
    delete savedUserObj.password;
    return savedUserObj;
  } catch (exc) {
    error(`${component}.addUser.exception`, reqId, exc);
    throw { status: exc.status || 500, msg: exc.msg || exc };
  }
};

methods.loginUser = async (creds, reqId) => {
  try {
    info(`${component}.loginUser.init`, reqId, creds);
    // Find the entry with same username/password
    const fieldsToReturn = ["_id", "name", "email", "phone", "sessions"];
		const q = {
			[creds.usernameType]: creds.username,
			isActive: true,     // Only look for active users
			password: encrypt(creds.password)       // Encrypt the incoming password
		};
    const user = await findUserWithFilter(q, fieldsToReturn);
    if (user) {
      const savedUserObj = user.toObject();
      savedUserObj.id = encrypt(savedUserObj._id.toString());
      // generate Session token for the user
      const sessionObj = await addUserSession(reqId, savedUserObj._id.toString(), creds.rememberMe);
      delete savedUserObj._id;
      delete savedUserObj.password;
      return {
        id: savedUserObj.id,
        session: sessionObj.id,
      };
    }
    throw { status: 401, msg: 'Invalid Credentials' };
  } catch (exc) {
    console.log(exc);
    error(`${component}.loginUser.exception`, reqId, exc);
    throw { status: exc.status || 500, msg: exc.msg || exc };
  }
};

methods.resetPassword = async (data, reqId) => {
  try {
    info(`${component}.resetPassword.init`, reqId, data);
    const q = {
      email: data.email,
      phone: data.phone,
    };

    const user = await updateUser(q, {
      password: encrypt(data.password)
    })

    if (user) {
      return 'Password updated successfully';
    }
    throw { status: 204, msg: 'No profile found' };
  } catch(exc) {
    console.log(exc);
    error(`${component}.resetPassword.exception`, reqId, exc);
    throw { status: exc.status || 500, msg: exc.msg || exc };
  }
};

module.exports = methods;