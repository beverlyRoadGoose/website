<template>
  <div>
    <div id="vue-headful">
      <vue-headful title="Tobi Adeyinka | Hello" />
    </div>
    <div id="content">
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
      <span id="hello">
        Hello. I'm <b>Tobi</b>, a Software Engineer currently based in Berlin.
        Outside of programming, I enjoy discovering good music: I recommend
        <a href="https://www.youtube.com/watch?v=2O6duDDkhis" target="_blank"
          ><b>The National</b></a
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
        >
          <img src="@/assets/github.png" alt="Github" />
        </a>

        <a
          href="https://www.linkedin.com/in/oluwatobi-adeyinka/"
          title="LinkedIn"
          class="find-me"
          target="_blank"
        >
          <img src="@/assets/linkedin.png" alt="LinkedIn" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Me from "@/assets/me.jpg";

export default {
  name: "Hello",

  data() {
    return {
      meImg: {
        src: Me,
        loaded: false
      }
    };
  },

  methods: {
    onMeImageLoad() {
      this.meImg.loaded = true;
    },

    track() {
      this.$ga.page("/hello");
    }
  }
};
</script>

<style lang="less" scoped>
@import "../styles/colors";

#vue-headful {
  visibility: hidden;
}

#content {
  width: 25%;
  margin: 50px auto;
}

@media only screen and (max-width: 1000px) {
  #content {
    width: 60%;
  }
}

#me {
  width: 100%;
  margin-bottom: 20px;
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
  color: @accent;
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
