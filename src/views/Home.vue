<template>
  <div>
    <div id="vue-headful">
      <vue-headful title="Tobi Adeyinka" />
    </div>
  </div>
</template>

<script>
import CookieManager from '@/util/CookieManager';

export default {
  name: 'Home',

  created() {
    let themeCookie = 'theme';
    if (!CookieManager.cookieExists(themeCookie)) {
      CookieManager.createCookie(themeCookie, 'light', 365);
    }
  },

  mounted() {
    this.$router.push('hello');
  },

  methods: {
    track() {
      this.$gtag.pageview({
        page_path: '/'
      });
    }
  }
};
</script>

<style lang="less" scoped>
#vue-headful {
  visibility: hidden;
}
</style>
