const state = {
  loader: {
    isVisible: false,
    text: 'Custom Loader Text',
  },
};

const actions = {
  showLoader({ commit }, text) {
    commit('setLoader', { isVisible: true, text });
  },
  closeLoader({ commit }) {
    commit('setLoader', { isVisible: false, text: 'Loading' });
  },
};

const getters = {
  loaderState: (vState) => vState.loader,
};

const mutations = {
  setLoader(vState, loaderInfo) {
    vState.loader = loaderInfo;
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
