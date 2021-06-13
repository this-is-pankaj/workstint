/* eslint-disable import/no-cycle */
import reqUtils from '../../utils/requestUtils';

const state = {
  userId: null,
  sessionId: null,
};
const actions = {
  async register({ commit }, data) {
    const signupRes = await reqUtils.sendRequest('signup', {}, data)
      .catch((err) => {
        console.log(err);
        throw err;
      });
    commit('setUser', signupRes);
  },
  async login({ commit }, data) {
    if (!data.isPostRegister) {
      const loginRes = await reqUtils.sendRequest('login', {}, data)
        .catch((err) => {
          console.log(err);
          throw err;
        });

      commit('setUserSession', loginRes);
    }
  },
  async resetPassword(context, data) {
    const resetPwdRes = await reqUtils.sendRequest('resetPassword', {}, data)
      .catch((err) => {
        console.log(err);
        throw err;
      });
    return resetPwdRes;
  },
  async logout({ commit }) {
    commit('setUserSession', { id: null, session: null });
  },
};
const getters = {
  isUserAuthenticated: (vState) => !!vState.userId,
  getSessionInfo: (vState) => vState,
};
const mutations = {
  setUserSession(vState, info) {
    vState.userId = info.id;
    vState.sessionId = info.session;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
