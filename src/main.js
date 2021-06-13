import Vue from 'vue';
import './registerServiceWorker';
import axios from 'axios';
import 'bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

import {
  faEye,
  faEyeSlash,
  faBars,
  faUser,
  faSave,
  faEdit,
  faPlus,
  faMinus,
  faWindowClose,
  faCheck,
  faLongArrowAltLeft,
  faArrowRight,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

import store from './store';
import App from './App.vue';
import router from './router';

// eslint-disable-next-line max-len
library.add(faEye, faEyeSlash, faBars, faUser, faSave, faEdit, faPlus, faMinus, faWindowClose, faCheck, faLongArrowAltLeft, faArrowRight, faArrowLeft);
Vue.component('font-awesome-icon', FontAwesomeIcon);

// axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000/';

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
