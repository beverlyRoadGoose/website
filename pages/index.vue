<template>
  <div id="screen" :style="screenStyle">
    <div id="content">
      <header-bar active="home" />
      <div id="hello" :style="helloStyle">
        Hello &#128075;&#127998; I'm <b>Tobi</b> - Human, Melomaniac, Software Engineer.
      </div>
      <transition name="fade">
        <img
          :src="meImg.src"
          @load="onMeImageLoad"
          v-show="meImg.loaded"
          id="me"
          title="Pic Saint-Michel, Vercors Massif, France"
        />
      </transition>
      <span id="about" :style="aboutStyle">
        I'm currently based in Berlin, building stuff at <a href="https://de.scalable.capital/en" target="_blank" @click="recordEmployerClickEvent" :style="aboutStyle"><b>Scalable Capital</b></a>.
        Previously, I worked at <a href="https://www.lifeatspotify.com/" target="_blank" @click="recordEmployerClickEvent" :style="aboutStyle"><b>Spotify</b></a>, <a href="https://www.hellofreshgroup.com/en/" target="_blank" @click="recordEmployerClickEvent" :style="aboutStyle"><b>HelloFresh</b></a>
        and <a href="https://www.raisin.com/" target="_blank" @click="recordEmployerClickEvent" :style="aboutStyle"><b>Raisin</b></a>.
        <br /><br />
        Outside of programming, I enjoy discovering <a href="https://www.youtube.com/watch?v=TeaDE1magRk" target="_blank" @click="recordMusicClickEvent" :style="aboutStyle"><b>good music</b></a>.
        In my free time, I create <NuxtLink to="/mixes" :style="aboutStyle"><b>Mixes</b></NuxtLink>, you can find
        them / follow me on <a href="https://www.mixcloud.com/beverlyroadgoose/" target="_blank" @click="recordMixcloudClickEvent" :style="aboutStyle"><b>Mixcloud</b></a>
      </span>

      <div id="find-me">
        <a
          href="https://www.linkedin.com/in/oluwatobi-adeyinka/"
          title="LinkedIn"
          class="find-me"
          :style="findMeStyle"
          target="_blank"
          @click="recordLinkedInClickEvent"
        >
          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <title>LinkedIn</title>
            <path
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            />
          </svg>
        </a>

        <a
          href="https://github.com/beverlyRoadGoose"
          title="GitHub"
          class="find-me"
          :style="findMeStyle"
          target="_blank"
          @click="recordGithubClickEvent"
        >
          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <title>GitHub</title>
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            />
          </svg>
        </a>

        <a
            href="mailto:hey@heytobi.dev"
            title="Write me"
            class="find-me"
            :style="findMeStyle"
            target="_blank"
            @click="recordEmailClickEvent"
        >
          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <title>Write me</title>
            <path d="M15.61 12c0 1.99-1.62 3.61-3.61 3.61-1.99 0-3.61-1.62-3.61-3.61 0-1.99 1.62-3.61 3.61-3.61 1.99 0 3.61 1.62 3.61 3.61M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12c2.424 0 4.761-.722 6.76-2.087l.034-.024-1.617-1.879-.027.017A9.494 9.494 0 0 1 12 21.54c-5.26 0-9.54-4.28-9.54-9.54 0-5.26 4.28-9.54 9.54-9.54 5.26 0 9.54 4.28 9.54 9.54a9.63 9.63 0 0 1-.225 2.05c-.301 1.239-1.169 1.618-1.82 1.568-.654-.053-1.42-.52-1.426-1.661V12A6.076 6.076 0 0 0 12 5.93 6.076 6.076 0 0 0 5.93 12 6.076 6.076 0 0 0 12 18.07a6.02 6.02 0 0 0 4.3-1.792 3.9 3.9 0 0 0 3.32 1.805c.874 0 1.74-.292 2.437-.821.719-.547 1.256-1.336 1.553-2.285.047-.154.135-.504.135-.507l.002-.013c.175-.76.253-1.52.253-2.457 0-6.617-5.383-12-12-12"/>
          </svg>
        </a>

        <a
            href="https://www.youtube.com/@BeverlyRoadGoose"
            title="YouTube"
            class="find-me"
            :style="findMeStyle"
            target="_blank"
            @click="recordYouTubeClickEvent"
        >
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 57 57" width="21px" height="21px"><path d="M 44.898438 14.5 C 44.5 12.300781 42.601563 10.699219 40.398438 10.199219 C 37.101563 9.5 31 9 24.398438 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.398438 17 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.898438 40.5 17.898438 41 24.5 41 C 31.101563 41 37.101563 40.5 40.601563 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.101563 35.5 C 45.5 33 46 29.398438 46.101563 25 C 45.898438 20.5 45.398438 17 44.898438 14.5 Z M 19 32 L 19 18 L 31.199219 25 Z"/></svg>        </a>
      </div>

      <div id="quote" :style="aboutStyle">
        Let everything happen to you. Beauty and Terror. Just keep going. No feeling is final.
      </div>
    </div>
  </div>
</template>

<script>
import Me from 'assets/img/me_mountain.jpg';
import { Events } from '@/util/Events';
import HeaderBar from '@/components/HeaderBar';
import CookieManager from '@/util/CookieManager';
import { Theme } from '@/util/Theme';

export default {
  name: 'Index',
  transition: {},
  components: { HeaderBar },
  head: {
    title: 'Tobi Adeyinka',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'description',
        content: "Hello. I'm Tobi, a Software Engineer currently based in Berlin."
      },
      { property: 'og:title', content: 'Tobi Adeyinka' },
      {
        property: 'og:description',
        content: "Hello. I'm Tobi, a Software Engineer currently based in Berlin."
      },
      { property: 'og:site_name', content: 'Tobi Adeyinka' },
      { property: 'og:type', content: 'website' },
      { name: 'robots', content: 'index,follow' },
      { property: 'og:url', content: 'https://heytobi.dev' },
      { property: 'og:image', content: `https://heytobi.dev${Me}` }
    ]
  },

  data() {
    return {
      meImg: {
        src: Me,
        loaded: false
      },

      screenStyle: {
        background: null
      },

      helloStyle: {
        color: null
      },

      aboutStyle: {
        color: null
      },

      findMeStyle: {
        fill: null
      }
    };
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

  methods: {
    onMeImageLoad() {
      this.meImg.loaded = true;
    },

    track() {
      this.$gtag.pageview({
        page_path: '/'
      });
    },

    recordMusicClickEvent() {
      this.$gtag.event('clickedMusic', {
        event_category: 'externalLinkClick',
        event_label: 'musicClick',
        value: 1
      });
    },

    recordEmployerClickEvent() {
      this.$gtag.event('clickedEmployer', {
        event_category: 'externalLinkClick',
        event_label: 'employerClick',
        value: 1
      });
    },

    recordMixcloudClickEvent() {
      this.$gtag.event('clickedMixcloud', {
        event_category: 'externalLinkClick',
        event_label: 'mixcloudClick',
        value: 1
      });
    },

    recordYouTubeClickEvent() {
      this.$gtag.event('clickedYouTube', {
        event_category: 'externalLinkClick',
        event_label: 'youTubeClick',
        value: 1
      });
    },

    recordLinkedInClickEvent() {
      this.$gtag.event('clickedLinkedIn', {
        event_category: 'externalLinkClick',
        event_label: 'linkedInClick',
        value: 1
      });
    },

    recordStackOverflowEvent() {
      this.$gtag.event('clickedStackOverflow', {
        event_category: 'externalLinkClick',
        event_label: 'stackOverflowClick',
        value: 1
      });
    },

    recordGithubClickEvent() {
      this.$gtag.event('clickedGithub', {
        event_category: 'externalLinkClick',
        event_label: 'githubClick',
        value: 1
      });
    },

    recordSpotifyClickEvent() {
      this.$gtag.event('clickedS', {
        event_category: 'externalLinkClick',
        event_label: 'spotifyClick',
        value: 1
      });
    },

    recordEmailClickEvent() {
      this.$gtag.event('clickedEmail', {
        event_category: 'externalLinkClick',
        event_label: 'emailClick',
        value: 1
      });
    },

    applyTheme: function(theme) {
      document.body.style.background = theme.background;
      this.screenStyle.background = theme.background;
      this.helloStyle.color = theme.accent;
      this.aboutStyle.color = theme.accent;
      this.findMeStyle.fill = theme.accent;
    }
  }
};
</script>

<style lang="less" scoped>
#screen {
  min-height: 100vh;
  transition: .5s;
  -moz-transition: .5s;
  -webkit-transition: .5s;
  -o-transition: .5s;
}

#hello {
  padding-top: 70px;
  margin-bottom: 20px;
  font-size: 25px;
  transition: .5s;
  -moz-transition: .5s;
  -webkit-transition: .5s;
  -o-transition: .5s;
}

#vue-headful {
  visibility: hidden;
}

#content {
  width: 35%;
  margin: auto;
}

#me {
  width: 100%;
  margin-bottom: 15px;
  border-radius: 3px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

#about {
  display: block;
  width: 100%;
  text-align: left;
  margin-bottom: 20px;
  font-size: .9em;
  font-weight: 500;
  transition: .5s;
  -moz-transition: .5s;
  -webkit-transition: .5s;
  -o-transition: .5s;
}

#about a {
  transition: .5s;
  -moz-transition: .5s;
  -webkit-transition: .5s;
  -o-transition: .5s;
}

#quote {
  text-align: left;
  font-style: italic;
  font-size: .8em;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-top: 5px;
  border-top: 1px solid #e6e6e6;
  transition: .5s;
  -moz-transition: .5s;
  -webkit-transition: .5s;
  -o-transition: .5s;
}

#find-me {
  margin-top: 10px;
  display: flex;
  align-content: flex-start;
}

.find-me {
  display: block;
  width: 15px;
  height: 15px;
  margin-right: 7px;
  transition: .5s;
  -moz-transition: .5s;
  -webkit-transition: .5s;
  -o-transition: .5s;
}

.find-me img {
  width: 16px;
  height: 16px;
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

  #about {
    font-size: 1em;
  }

  #quote {
    font-size: 1em;
  }
}

</style>
