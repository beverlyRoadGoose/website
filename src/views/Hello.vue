<template>
  <div id="screen" :style="screenStyle">
    <div id="vue-headful">
      <vue-headful title="Tobi Adeyinka | Hello" />
    </div>
    <div id="content">
      <theme-switch :theme="initialTheme" />
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
        Hello. I'm <b>Tobi</b>, a Software Engineer currently based in Berlin.
        Outside of programming, I enjoy discovering good music: I recommend
        <a
          href="https://www.youtube.com/watch?v=2O6duDDkhis"
          target="_blank"
          @click="recordNtlClickEvent"
        >
          <b>The National</b></a
        >
        every chance I get.<br /><br />If you'd like to get in touch, write me
        at <a href="mailto:hey@heytobi.dev"><b>hey@heytobi.dev</b></a>
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
      </div>
    </div>
  </div>
</template>

<script>
import Me from '@/assets/me.jpg';
import { Events } from '@/Events';
import { Theme } from '@/styles/Theme';
import ThemeSwitch from '@/components/ThemeSwitch';

export default {
  name: 'Hello',

  props: ['theme'],

  components: { ThemeSwitch },

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

  created() {
    this.applyTheme(this.initialTheme);
    this.$root.$on(Events.THEME_CHANGED, (event, theme) =>
      this.applyTheme(theme)
    );
  },

  methods: {
    onMeImageLoad() {
      this.meImg.loaded = true;
    },

    track() {
      this.$gtag.pageview({
        page_path: '/hello'
      });
    },

    recordNtlClickEvent() {
      this.$gtag.event('clickedNtl', {
        event_category: 'externalLinkClick',
        event_label: 'ntlClick',
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

    recordLinkedInClickEvent() {
      this.$gtag.event('clickedLinkedIn', {
        event_category: 'externalLinkClick',
        event_label: 'linkedInClick',
        value: 1
      });
    },

    applyTheme: function(theme) {
      this.screenStyle.background = theme.background;
      this.helloStyle.color = theme.accent;
      this.findMeStyle.fill = theme.accent;
    }
  },

  computed: {
    initialTheme: function() {
      return this.theme === Theme.light.name ? Theme.light : Theme.dark;
    }
  }
};
</script>

<style lang="less" scoped>
@import '../styles/base';
@import '../styles/colors';

#screen {
  min-height: 100vh;
  .transitions;
}

#vue-headful {
  visibility: hidden;
}

#content {
  width: 25%;
  margin: auto;
  padding-top: 20px;
}

@media only screen and (max-width: 1000px) {
  #content {
    width: 60%;
  }
}

#me {
  width: 100%;
  margin-bottom: 10px;
  border-radius: 2px;
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
  .transitions;
}

#find-me {
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
