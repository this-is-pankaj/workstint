/* eslint-disable import/no-cycle */
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import auth from './modules/auth.module';
import user from './modules/user.module';
import loader from './modules/loader.module';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    user,
    loader,
  },
  plugins: [createPersistedState()],
});

export default store;
