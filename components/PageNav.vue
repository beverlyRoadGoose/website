<template>
  <div id="page-nav">
    <div class="nav-item-wrapper">
      <NuxtLink
        to="/posts"
        class="nav-item"
        :style="navItemStyle"
        title="Posts"
      >Posts
      </NuxtLink>
    </div>
    <div class="nav-item-wrapper">
      <NuxtLink to="/" class="nav-item" :style="navItemStyle" title="Home">
        Home
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { Events } from '@/util/Events';
import { Theme } from '@/util/Theme';
import CookieManager from '@/util/CookieManager';

export default {
  name: 'PageNav',
  props: ['active'],

  mounted() {
    let themeCookie = 'theme';
    if (!CookieManager.cookieExists(themeCookie)) {
      CookieManager.createCookie(themeCookie, 'light', 365)
    }

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

#page-nav {
  display: inline-block;
}

.nav-item-wrapper {
  float: right;
  margin-left: 10px;
}

.nav-item {
  text-decoration: none;
  font-size: 0.9em;
  transition: .5s;
  -moz-transition: .5s;
  -webkit-transition: .5s;
  -o-transition: .5s;
}

.nav-item:hover {
  text-decoration: underline;
}
</style>
