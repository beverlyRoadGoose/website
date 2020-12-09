import Vue from 'vue';
import VueGtag from 'vue-gtag';
import VueMeta from 'vue-meta';
import VuePageTransition from 'vue-page-transition';

import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VuePageTransition);
Vue.use(VueGtag, {
  config: {
    id: 'G-PR1RKQJ3YL'
  }
});

Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
});

require('@/styles/base.less');
require('@/styles/colors.less');

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
