// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

import HeaderView from 'components/Header';
import BottomBarView from 'components/BottomBar';

import './assets/style.scss';
import './assets/font/scss/font-awesome.scss';

Vue.component('HeaderView', HeaderView);
Vue.component('BottomBarView', BottomBarView);
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App}
})
