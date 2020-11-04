import Vue from "vue";
import VueHeadful from "vue-headful";
import VueAnalytics from "vue-analytics";
import VuePageTransition from "vue-page-transition";

import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;
Vue.component("vue-headful", VueHeadful);

Vue.use(VuePageTransition);
Vue.use(VueAnalytics, { id: "G-PR1RKQJ3YL" });

require("@/styles/base.less");
require("@/styles/colors.less");

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
