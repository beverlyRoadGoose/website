<template>
  <div id="paracosms" :style="screenStyle">
    <div id="content">
      <header-bar active="paracosms" />
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar';
import ArticlePreview from '@/components/ArticlePreview';
import Me from 'assets/img/me_beach.jpg';
import CookieManager from '@/util/CookieManager';
import { Theme } from '@/util/Theme';
import { Events } from '@/util/Events';
import { ComfortableApi } from '@/util/Comfortable';

export default {
  name: "paracosms",
  transition: {},
  components: { HeaderBar },
  head: {
    title: 'Tobi Adeyinka | Paracosms',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'description',
        content: "Hello. I'm Tobi, a Software Engineer currently based in Berlin."
      },
      { property: 'og:title', content: 'Tobi Adeyinka | Paracosms' },
      {
        property: 'og:description',
        content: "Hello. I'm Tobi, a Software Engineer currently based in Berlin."
      },
      { property: 'og:site_name', content: 'Tobi Adeyinka | Paracosms' },
      { property: 'og:type', content: 'website' },
      { name: 'robots', content: 'index,follow' },
      { property: 'og:url', content: 'https://heytobi.dev/paracosms' },
      { property: 'og:image', content: `https://heytobi.dev${Me}` }
    ]
  },

  created() {
    this.getParacosms();
  },

  mounted() {
    let themeCookie = 'theme';

    if (!CookieManager.cookieExists(themeCookie)) {
      CookieManager.createCookie(themeCookie, 'light', 365)
    }

    this.applyTheme(
        CookieManager.readCookie(themeCookie) === 'light' ? Theme.light : Theme.dark
    );

    this.$root.$on(Events.THEME_CHANGED, (event, theme) => {
      this.applyTheme(theme);
    });
  },

  data() {
    return {
      screenStyle: {
        background: null
      },
      paracosms: [],
      totalParacosms: 0,
      loading: false
    };
  },

  methods: {
    track() {
      this.$gtag.pageview({
        page_path: '/paracosms'
      });
    },

    getParacosms() {
    },

    applyTheme: function(theme) {
      document.body.style.background = theme.background;
      this.screenStyle.background = theme.background;
    }
  }
};
</script>

<style scoped>
#paracosms {
  min-height: 100vh;
  transition: .5s;
  -moz-transition: .5s;
  -webkit-transition: .5s;
  -o-transition: .5s;
}

#content {
  width: 30%;
  margin: auto;
  transition: .5s;
  -moz-transition: .5s;
  -webkit-transition: .5s;
  -o-transition: .5s;
}

@media only screen and (max-width: 1000px) {
  #content {
    width: 80%;
  }
}
</style>
