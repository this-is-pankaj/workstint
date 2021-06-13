'use strict';
const SessionModel = require('../model/session.model');
const { info, error, debug } = require('../shared/logger');
const { generateUUID } = require('../shared/utils');
const component = 'sessions.component';
const methods = {};
const sessionAge = {
  default: 3*60*60*1000, // Default 3hr valid session
  never: 0, // Never expiring token
};

// Fetch the sessions for a given user
const getUserSessions = async (userId) => {
  try {
    const q = {
      userId,
    };
    const userSessions = await SessionModel.findOne(q);
    return userSessions;
  } catch(exc) {
    throw exc;
  }
};

// Update the sessionsList for a given user
const updateSessions = async (userId, sessions) => {
  try {
    const q = {
      userId,
    };
    const updatedSessions = {
      userId,
      sessions,
    };

    const options = {
      upsert: true,
    };

    const updateRes = await SessionModel.findOneAndUpdate(q, updatedSessions, options);
    if (updateRes) {
      return updateRes;
    }
    throw { status: 500, msg: 'Unable to update Session Values'};
  } catch(exc) {
    throw exc;
  }
};

methods.addUserSession = async (reqId, id, noExpiration) => {
  try {
    info(`${component}.addUserSession.init`, reqId, id);
    const encUserId = id;
    let sessionObj = {
      id: generateUUID(),
      expiry: noExpiration? sessionAge.never : (Date.now() + sessionAge.default),
    };

    // Check if the user has any active sessions
    // If not, create a new entry with a sesionID
    const userSessions = await getUserSessions(encUserId);
    if(userSessions) {
      let { userId, sessions } = userSessions;
      if (!sessions) {
        sessions = [];
      }
      // Todo- Put a check on the max number of sessions
      sessions.push(sessionObj);
      const updateRes = await updateSessions(userId, sessions);
    } else {
      const sessionInfo = new SessionModel({
        userId: encUserId,
        sessions: [sessionObj],
      });
      const sessionRes = await sessionInfo.save();
    }
    // Return session Obj for client
    return sessionObj;
  } catch (exc) {
    error(`${component}.addUserSession.exception`, reqId, exc);
    throw { status: exc.status || 500, msg: exc.msg || exc };
  }
};

methods.validateUserSession = async (reqId, id, sessionId) => {
  try {
    info(`${component}.validateUserSession.init`, reqId, id);
    const encUserId = id;
    let isSessionValid = false;
    // Check if the user has any active sessions
    const userSessions = await getUserSessions(encUserId);
    if(userSessions) {
      let { userId, sessions } = userSessions;
      const matchingSession = sessions.find(s => s.id === sessionId);
      // If a match is found, validate the expiry
      if (matchingSession) {
        const { id, expiry, createdOn } = matchingSession;
        const now = Date.now();
        // Expiry is 0 for non-expiring sessionIDs
        if (!expiry) {
          isSessionValid = true;
        } else if (expiry > now) {
          isSessionValid = true;
        }
      }
    }
    return isSessionValid;
  } catch (exc) {
    error(`${component}.validateUserSession.exception`, reqId, exc);
    return false;
  }
};

module.exports = methods;