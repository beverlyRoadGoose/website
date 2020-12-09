<template>
  <div id="page-nav">
    <div class="nav-item-wrapper">
      <router-link
        to="/blog"
        class="nav-item"
        :style="navItemStyle"
        title="Blog"
        >Blog
      </router-link>
    </div>
    <div class="nav-item-wrapper">
      <router-link to="/" class="nav-item" :style="navItemStyle" title="Home">
        Home
      </router-link>
    </div>
  </div>
</template>

<script>
import { Events } from '@/Events';
import { Theme } from '@/styles/Theme';
import CookieManager from '@/util/CookieManager';

export default {
  name: 'PageNav',
  props: ['active'],

  mounted() {
    this.applyTheme(this.themeObject);
    this.$root.$on(Events.THEME_CHANGED, (event, theme) => {
      this.applyTheme(theme);
    });
  },

  data() {
    return {
      navItemStyle: {
        color: null
      }
    };
  },

  methods: {
    applyTheme: function(theme) {
      this.navItemStyle.color = theme.accent;
    }
  },

  computed: {
    themeObject: function() {
      return CookieManager.readCookie('theme') === 'light'
        ? Theme.light
        : Theme.dark;
    }
  }
};
</script>

<style lang="less" scoped>
@import '../styles/base';

#page-nav {
  display: inline-block;
}

.nav-item-wrapper {
  display: inline-block;
  float: right;
  margin-left: 10px;
}

.nav-item {
  text-decoration: none;
  font-size: 0.9em;
  .transitions;
}

.nav-item:hover {
  text-decoration: underline;
}
</style>
