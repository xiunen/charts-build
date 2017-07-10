import Vue from 'vue';

import App from '../src';
import router from '../src/routes';

const app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
});
