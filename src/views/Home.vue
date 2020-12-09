<template>
  <div id="screen" :style="screenStyle">
    <div id="content">
      <header-bar active="home" />
      <transition name="fade">
        <img
          :src="meImg.src"
          @load="onMeImageLoad"
          v-show="meImg.loaded"
          id="me"
          alt="Picture of me"
          title="Tobi Adeyinka"
        />
      </transition>
      <span id="hello" :style="helloStyle">
        Hello &#128075;&#127998;. I'm <b>Tobi</b>, a Software Engineer currently
        based in Berlin. Outside of programming, I enjoy discovering good music:
        I recommend
        <a
          href="https://www.youtube.com/watch?v=2O6duDDkhis"
          target="_blank"
          @click="recordNtlClickEvent"
        >
          <b>The National</b></a
        >
        every chance I get. Occasionally,
        <router-link to="blog"><b> I write</b></router-link
        >. <br /><br />
        If you'd like to get in touch, feel free to
        <a href="mailto:hey@heytobi.dev"><b>write me</b></a
        >.
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
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>LinkedIn</title>
            <path
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            />
          </svg>
        </a>

        <a
          href="https://stackoverflow.com/users/story/4961714"
          title="StackOverflow"
          class="find-me"
          :style="findMeStyle"
          target="_blank"
          @click="recordStackOverflowEvent"
        >
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Stack Overflow</title>
            <path
              d="M18.986 21.865v-6.404h2.134V24H1.844v-8.539h2.13v6.404h15.012zM6.111 19.731H16.85v-2.137H6.111v2.137zm.259-4.852l10.48 2.189.451-2.07-10.478-2.187-.453 2.068zm1.359-5.056l9.705 4.53.903-1.95-9.706-4.53-.902 1.936v.014zm2.715-4.785l8.217 6.855 1.359-1.62-8.216-6.853-1.35 1.617-.01.001zM15.751 0l-1.746 1.294 6.405 8.604 1.746-1.294L15.749 0h.002z"
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
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>GitHub</title>
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            />
          </svg>
        </a>

        <a
          href="https://spoti.fi/2D7U5TS"
          title="Spotify"
          class="find-me"
          :style="findMeStyle"
          target="_blank"
          @click="recordSpotifyClickEvent"
        >
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Spotify</title>
            <path
              d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
            />
          </svg>
        </a>
      </div>

      <div id="quote" :style="helloStyle">
        Let everything happen to you. Beauty and Terror. Just keep going. No
        feeling is final.
      </div>
    </div>
  </div>
</template>

<script>
import Me from '@/assets/me_beach.jpg';
import { Events } from '@/Events';
import HeaderBar from '@/components/HeaderBar';
import CookieManager from '@/util/CookieManager';
import { Theme } from '@/styles/Theme';

export default {
  name: 'Home',
  components: { HeaderBar },
  metaInfo: {
    title: 'Tobi Adeyinka',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'description',
        content:
          "Hello &#128075;&#127998;. I'm Tobi, a Software Engineer currently based in Berlin."
      },
      { property: 'og:title', content: 'Tobi Adeyinka' },
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

      findMeStyle: {
        fill: null
      }
    };
  },

  mounted() {
    this.applyTheme(
      CookieManager.readCookie('theme') === 'light' ? Theme.light : Theme.dark
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

    recordNtlClickEvent() {
      this.$gtag.event('clickedNtl', {
        event_category: 'externalLinkClick',
        event_label: 'ntlClick',
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
      this.$gtag.event('clickedSpotify', {
        event_category: 'externalLinkClick',
        event_label: 'spotifyClick',
        value: 1
      });
    },

    applyTheme: function(theme) {
      document.body.style.background = theme.background;
      this.screenStyle.background = theme.background;
      this.helloStyle.color = theme.accent;
      this.findMeStyle.fill = theme.accent;
    }
  }
};
</script>

<style lang="less" scoped>
@import '../styles/base';

#screen {
  min-height: 100vh;
  .transitions;
}

#vue-headful {
  visibility: hidden;
}

#content {
  width: 30%;
  margin: auto;
}

@media only screen and (max-width: 1000px) {
  #content {
    width: 80%;
  }
}

#me {
  width: 100%;
  margin-bottom: 10px;
  border-radius: 3px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

#hello {
  display: block;
  width: 100%;
  text-align: left;
  margin-bottom: 20px;
  font-size: 0.9em;
  .transitions;
}

#quote {
  text-align: left;
  font-style: italic;
  font-size: 0.8em;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-top: 5px;
  border-top: 1px solid #e6e6e6;
  .transitions;
}

#find-me {
  margin-top: 10px;
  display: flex;
  align-content: flex-start;
}

.find-me {
  display: block;
  width: 16px;
  height: 16px;
  margin-right: 5px;
  .transitions;
}

.find-me img {
  width: 16px;
  height: 16px;
}
</style>
