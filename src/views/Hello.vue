<template>
  <div>
    <div id="vue-headful">
      <vue-headful title="Tobi Adeyinka" />
    </div>
    <div id="content">
      <img src="@/assets/me.jpg" id="me" />
      <span id="hello">
        Hello. I'm <b>Tobi</b>, a Software Engineer currently based in Berlin.
        Outside of programming, I enjoy discovering good music: I recommend
        <a href="https://www.youtube.com/watch?v=2O6duDDkhis" target="_blank"
          ><b>The National</b></a
        >
        every chance I get.<br /><br />If you'd like to get in touch, write me
        at <a href="mailto:hey@heytobi.dev"><b>hey@heytobi.dev</b></a
        >.
      </span>
      <div id="find-me">
        <a
          href="https://github.com/beverlyRoadGoose"
          title="GitHub"
          class="find-me"
          target="_blank"
        >
          <img src="@/assets/github.png" />
        </a>

        <a
          href="https://www.linkedin.com/in/oluwatobi-adeyinka/"
          title="LinkedIn"
          class="find-me"
          target="_blank"
        >
          <img src="@/assets/linkedin.png" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hello"
};
</script>

<style scoped>
#vue-headful {
  visibility: hidden;
}

#content {
  width: 25%;
  margin: auto;
}

@media only screen and (max-width: 1000px) {
  #content {
    width: 60%;
    margin: auto;
  }
}

#me {
  width: 100%;
  margin-top: 50px;
  margin-bottom: 20px;
  border-radius: 2px;
}

#hello {
  display: block;
  width: 100%;
  text-align: left;
  margin-bottom: 20px;
  color: #171717;
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
