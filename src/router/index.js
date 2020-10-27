import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Hello from "@/views/Hello.vue";
import { preloadImage } from "@/util/preloadImage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    // eslint-disable-next-line no-unused-vars
    beforeEnter(to, from, next) {
      preloadImage("../assets/me.jpg");
      next();
    }
  },

  {
    path: "/hello",
    name: "hello",
    component: Hello
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
