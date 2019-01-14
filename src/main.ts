// import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';

import store from './store';

import './registerServiceWorker';

import request from '@/utils/request';

import i18n from './i18n/i18n';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue);

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

const theme = {
  primary: '#1976D2',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107',
};

Vue.use(Vuetify, { theme });

Vue.prototype.$http = request;
Vue.config.productionTip = false;

new Vue({
  i18n,
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
