import Vue from 'vue';
import './registerServiceWorker';
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

import App from './App.vue';
import router from './router';

// eslint-disable-next-line max-len
library.add(faEye, faEyeSlash, faBars, faUser, faSave, faEdit, faPlus, faMinus, faWindowClose, faCheck, faLongArrowAltLeft, faArrowRight, faArrowLeft);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
