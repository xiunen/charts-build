import Vue from 'vue';

import App from '../src';
import routes from '../src/routes';

const app = new Vue({
  el: '#app',
  routes,
  template: '<App/>',
  components: {
    App
  }
});
