import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import CookieManager from '@/util/CookieManager';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    props: {
      theme: CookieManager.readCookieOrDefault('theme', 'light')
    }
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
