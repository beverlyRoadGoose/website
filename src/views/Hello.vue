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
          href="https://github.com/beverlyRoadGoose"
          title="GitHub"
          class="find-me"
          target="_blank"
          @click="recordGithubClickEvent"
        >
          <img src="@/assets/github.png" alt="Github" />
        </a>

        <a
          href="https://www.linkedin.com/in/oluwatobi-adeyinka/"
          title="LinkedIn"
          class="find-me"
          target="_blank"
          @click="recordLinkedInClickEvent"
        >
          <img src="@/assets/linkedin.png" alt="LinkedIn" />
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
  margin-right: 10px;
}

.find-me img {
  width: 16px;
  height: 16px;
}
</style>
