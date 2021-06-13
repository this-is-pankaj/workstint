/* eslint-disable import/no-cycle */
import axios from 'axios';
import store from '../store';

const apiMapper = {
  signup: {
    method: 'POST',
    url: '/api/users/register',
    loaderText: 'Signing You Up',
  },
  login: {
    method: 'POST',
    url: '/api/users/login',
    loaderText: 'Logging You In',
  },
  resetPassword: {
    method: 'POST',
    url: '/api/users/forgot-password',
    loaderText: 'Resetting Your Password',
  },
  myProfile: {
    method: 'GET',
    url: '/api/profile/details',
    loaderText: 'Fetching your profile info',
  },
  updateMyProfile: {
    method: 'PUT',
    url: '/api/profile/update',
    loaderText: 'Updating your Profile',
  },
  fetchGstinInfo: {
    method: 'GET',
    url: '/api/gstin',
    loaderText: 'Fetching Details',
  },
};

const mandatoryHeaders = {
  userId: 'ws-user',
  session: 'ws-session-token',
};

const getDefaultHeaders = () => {
  const { userId, sessionId } = store.getters.getSessionInfo;
  let defaultHeaders = {};
  if (sessionId) {
    defaultHeaders = {
      [mandatoryHeaders.userId]: userId,
      [mandatoryHeaders.session]: sessionId,
    };
  }
  return defaultHeaders;
};

const sendRequest = (action, qs, data, headers) => (
  new Promise((resolve, reject) => {
    store.dispatch('showLoader', apiMapper[action].loaderText || 'Loading');
    try {
      if (!action) {
        console.log('No action provided');
        store.dispatch('closeLoader');
        return;
      }

      const defaultHeaders = getDefaultHeaders();
      const config = {
        method: apiMapper[action].method,
        url: apiMapper[action].url,
        params: qs,
        data,
        headers: {
          ...headers,
          ...defaultHeaders,
        },
      };
      axios(config)
        .then((res) => {
          console.log(res);
          store.dispatch('closeLoader');
          resolve(res.data.data);
        })
        .catch((err) => {
          console.log(err);
          store.dispatch('closeLoader');
          reject(err);
        });
    } catch (exc) {
      console.log(exc);
      store.dispatch('closeLoader');
      reject(exc);
    }
  })
);

export default {
  sendRequest,
};
