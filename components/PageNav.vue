<template>
  <div id="page-nav">
    <div class="nav-item-wrapper">
      <NuxtLink to="/" class="nav-item" :style="navItemStyle" title="Home">Home</NuxtLink>
      <div class="underline" :style="navUnderlineStyle" :class="this.underline('home')"></div>
    </div>
<!--<div class="nav-item-wrapper">
      <NuxtLink to="/posts" class="nav-item" :style="navItemStyle" title="Posts">Posts</NuxtLink>
      <div class="underline" :style="navUnderlineStyle" :class="this.underline('posts')"></div>
    </div>
-->
    <div class="nav-item-wrapper">
      <NuxtLink to="/mixes" class="nav-item" :style="navItemStyle" title="Mixes">Mixes</NuxtLink>
      <div class="underline" :style="navUnderlineStyle" :class="this.underline('mixes')"></div>
    </div>
<!--<div class="nav-item-wrapper">
      <NuxtLink to="/paracosms" class="nav-item" :style="navItemStyle" title="Paracosms">Paracosms</NuxtLink>
      <div class="underline" :style="navUnderlineStyle" :class="this.underline('paracosms')"></div>
    </div>
-->
<!--<div class="nav-item-wrapper">
      <NuxtLink to="/favorites" class="nav-item" :style="navItemStyle" title="Favorites">Favorites</NuxtLink>
      <div class="underline" :style="navUnderlineStyle" :class="this.underline('favorites')"></div>
    </div>
-->
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
      },

      navUnderlineStyle: {
        backgroundColor: null
      }
    };
  },

  methods: {
    applyTheme: function(theme) {
      this.navItemStyle.color = theme.accent;
      this.navUnderlineStyle.backgroundColor = theme.accent;
    },

    underline: function(route) {
      return this.active == route ? 'underline-active' : ''
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
  display: inline-block;
  margin-right: 5px;
}

.nav-item {
  text-decoration: none;
  font-size: .9em;
  font-weight: 500;
}

.underline {
  width: 0;
  border: 0;
  margin: 0;
  min-height: 2px;
  transition: .5s;
  -moz-transition: .5s;
  -webkit-transition: .5s;
  -o-transition: .5s;
}

.underline-active {
  width: 100%;
}

.nav-item-wrapper:hover .underline {
  width: 100%;
}


@media only screen and (max-width: 1000px) {
  .nav-item {
    font-size: .9em;
  }
}

@media only screen and (min-width: 1500px) {
  .nav-item {
    font-size: 1em;
  }
}
</style>
