import Vue from "vue";
import VueHeadful from "vue-headful";
import VuePageTransition from "vue-page-transition";

import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;
Vue.component("vue-headful", VueHeadful);

Vue.use(VuePageTransition);

require("@/styles/base.less");
require("@/styles/colors.less");

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
