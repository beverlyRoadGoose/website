<template>
  <div id="mixes">
    <div id="content">
      <header-bar active="mixes" />
<!--  <div id="intro" :style="introStyle"></div>-->
      <iframe width="100%" height="120" src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2Fbeverlyroadgoose%2Fsan-junipero-mixes-003%2F"></iframe>
      <iframe width="100%" height="120" src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2Fbeverlyroadgoose%2Fsan-junipero-mixes-002%2F"></iframe>
      <iframe width="100%" height="120" src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2Fbeverlyroadgoose%2Fsan-junipero-mixes-001%2F"></iframe>    
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar.vue';
import Me from 'assets/img/me_mountain.jpg';
import CookieManager from '@/util/CookieManager';
import {Theme} from '@/util/Theme';
import {Events} from '@/util/Events';

export default {
  name: 'mixes',
  transition: {},
  components: { HeaderBar },
  head: {
    title: 'Tobi Adeyinka | Mixes',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        name: 'description',
        content: "Hello. I'm Tobi, a Software Engineer currently based in Berlin. On this page, you'll find my mixes."
      },
      {property: 'og:title', content: 'Tobi Adeyinka | Mixes'},
      {
        property: 'og:description',
        content: "Hello. I'm Tobi, a Software Engineer currently based in Berlin. On this page, you'll find my mixes."
      },
      {property: 'og:site_name', content: 'Tobi Adeyinka | Mixes'},
      {property: 'og:type', content: 'website'},
      {name: 'robots', content: 'index,follow'},
      {property: 'og:url', content: 'https://heytobi.dev/mixes'},
      {property: 'og:image', content: `https://heytobi.dev${Me}`}
    ]
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

      introStyle: {
        color: null
      },

      listStyle: {
        color: null
      }
    };
  },

  methods: {
    track() {
      this.$gtag.pageview({
        page_path: '/favorites'
      });
    },

    recordInvisibiliaClickEvent() {
      this.$gtag.event('clickedInvisibilia', {
        event_category: 'favoriteLinkClick',
        event_label: 'invisibiliaClick',
        value: 1
      });
    },

    recordHumanClickEvent() {
      this.$gtag.event('clickedHuman', {
        event_category: 'favoriteLinkClick',
        event_label: 'humanClick',
        value: 1
      });
    },

    applyTheme: function(theme) {
      document.body.style.background = theme.background;
      this.screenStyle.background = theme.background;
      this.introStyle.color = theme.accent;
      this.listStyle.color = theme.accent;
    }
  },
}
</script>

<style scoped>
iframe {
  margin-bottom: 30px;
  border: 0;
}

#mixes {
  min-height: 100vh;
  transition: .5s;
  -moz-transition: .5s;
  -webkit-transition: .5s;
  -o-transition: .5s;
}

#content {
  width: 35%;
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

#intro {
  padding-top: 70px;
  margin-bottom: 30px;
  width: 100%;
  text-align: left;
  font-size: .9em;
  font-weight: 500;
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

@media only screen and (min-width: 1500px) {
  #content {
    width: 30%;
  }

  #intro {
    font-size: 1em;
  }
}
</style>
