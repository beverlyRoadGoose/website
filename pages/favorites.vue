<template>
  <div id="favorites">
    <div id="content">
      <header-bar active="favorites" />
      <div id="intro" :style="introStyle">On this page is a list of stuff I like / can recommend.</div>

      <ul id="list" :style="listStyle">
        <li>
          <a href="https://www.npr.org/podcasts/510307/invisibilia" target="_blank" class="title" @click="recordInvisibiliaClickEvent">Invisibilia</a>
          <div class="description">
            A Podcast that "explores the intangible forces that shape human behavior—things like ideas, beliefs, assumptions and emotions".
          </div>
        </li>

        <li>
          <a href="https://www.youtube.com/watch?v=vdb4XGVTHkE" target="_blank" class="title" @click="recordHumanClickEvent">HUMAN</a>
          <div class="description">
            A 3 volume documentary series by Yann Arthus-Bertrand, exploring the Human condition in the form of interviews
            with people of widely varying cultures and status.
            All volumes are available on <a href="https://www.youtube.com/watch?v=vdb4XGVTHkE" target="_blank">YouTube</a>, <b>highly recommended</b>.
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar';
import Me from 'assets/img/me.jpg';
import CookieManager from '@/util/CookieManager';
import {Theme} from '@/util/Theme';
import {Events} from '@/util/Events';

export default {
  name: 'favorites',
  transition: {},
  components: { HeaderBar },
  head: {
    title: 'Tobi Adeyinka | Favorites',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        name: 'description',
        content: "Hello. I'm Tobi, a Software Engineer currently based in Berlin. " +
            "On this page, you'll find a list of things I randomly bumped into on the interwebs which " +
            "I think are cool and worth sharing."
      },
      {property: 'og:title', content: 'Tobi Adeyinka | Favorites'},
      {
        property: 'og:description',
        content: "Hello. I'm Tobi, a Software Engineer currently based in Berlin. " +
            "On this page, you'll find a list of things I randomly bumped into on the interwebs which " +
            "I think are cool and worth sharing."
      },
      {property: 'og:site_name', content: 'Tobi Adeyinka | Favorites'},
      {property: 'og:type', content: 'website'},
      {name: 'robots', content: 'index,follow'},
      {property: 'og:url', content: 'https://heytobi.dev/favorites'},
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
#favorites {
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
  font-size: .8em;
  font-weight: 500;
  transition: .5s;
  -moz-transition: .5s;
  -webkit-transition: .5s;
  -o-transition: .5s;
}

#list {
  padding-left: 20px;
  margin: auto;
  font-size: .8em;
  font-weight: 500;
  transition: .5s;
  -moz-transition: .5s;
  -webkit-transition: .5s;
  -o-transition: .5s;
}

#list li {
  margin-bottom: 20px;
}

.description {
  margin-top: 5px;
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
    font-size: .9em;
  }

  #list {
    font-size: .9em;
  }
}
</style>
