import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../pages/Home';
import Category from '../pages/Category';

const routes = [
  {path: '/', component: Home},
  {path: '/category', component: Category}
];

Vue.use(VueRouter);
const router = new VueRouter({routes});

export default router;
