import Vue from 'vue';
import Blog from '@/views/Blog';
import Me from '@/assets/me.jpg';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Hello from '@/views/Hello.vue';
import BlogPost from '@/views/BlogPost';
import { preloadImage } from '@/util/preloadImage';
import { createDefaultThemeCookie } from '@/util/createDefaultThemeCookie';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    // eslint-disable-next-line no-unused-vars
    beforeEnter(to, from, next) {
      createDefaultThemeCookie();
      next();
    }
  },

  {
    path: '/hello',
    name: 'hello',
    component: Hello,
    beforeEnter(to, from, next) {
      preloadImage(Me);
      createDefaultThemeCookie();
      next();
    }
  },

  {
    path: '/blog',
    name: 'blog',
    component: Blog,
    beforeEnter(to, from, next) {
      createDefaultThemeCookie();
      next();
    }
  },

  {
    path: '/blog/:slug',
    name: 'blog-post',
    components: BlogPost,
    beforeEnter(to, from, next) {
      preloadImage(Me);
      createDefaultThemeCookie();
      next();
    }
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
