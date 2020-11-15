<template>
  <div id="blog" :style="screenStyle">
    <div id="vue-headful">
      <vue-headful title="Tobi Adeyinka | Blog" />
    </div>
    <div id="content">
      <header-bar active="home" />
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar';
import { Events } from '@/Events';
import CookieManager from '@/util/CookieManager';
import { Theme } from '@/styles/Theme';

export default {
  name: 'Blog',
  components: { HeaderBar },

  mounted() {
    this.applyTheme(
      CookieManager.readCookie('theme') === 'light' ? Theme.light : Theme.dark
    );
    this.$root.$on(Events.THEME_CHANGED, (event, theme) => {
      this.theme = theme.name;
      this.applyTheme(theme);
    });
  },

  data() {
    return {
      theme: CookieManager.readCookie('theme'),
      screenStyle: {
        background: null
      }
    };
  },

  methods: {
    applyTheme: function(theme) {
      document.body.style.background = theme.background;
      this.screenStyle.background = theme.background;
    }
  }
};
</script>

<style lang="less" scoped>
@import '../styles/base';

#blog {
  min-height: 100vh;
  .transitions;
}

#content {
  width: 30%;
  margin: auto;
}

@media only screen and (max-width: 1000px) {
  #content {
    width: 60%;
  }
}
</style>
