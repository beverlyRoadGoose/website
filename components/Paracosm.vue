<template>
  <div id="paracosm">
    <div id="image-wrap" title="Play on Spotify">
      <a :href="this.paracosm.spotify_url" target="_blank">
        <img id="image" :src="this.paracosm.img" :alt="'Paracosm ' + this.paracosm.title" :title="'Paracosm ' + this.paracosm.title"/>
        <div id="play">
          <img src="@/assets/img/play.png"/>
        </div>
      </a>
    </div>
    <div id="tracks">
      <a id="title-wrap" :href="this.paracosm.spotify_url" target="_blank" title="Play on Spotify"><img id="spotify-logo" src="@/assets/img/Spotify.png"/><h2 id="title">{{ this.paracosm.title }}</h2><br /></a>
      <a :href="track.track.external_urls.spotify" target="_blank" class="track" v-for="(track, index) in tracks" :key="track.track.id" title="Play on Spotify">
        <span class="index">{{ index + 1 }}.</span> <span class="track-name" :style="screenStyle">{{ track.track.name }}</span><br />
        <span class="artist">{{ artists(track.track.artists) }}</span>
      </a>
    </div>
  </div>
</template>

<script>
import CookieManager from '@/util/CookieManager';
import {Theme} from '@/util/Theme';
import {Events} from '@/util/Events';

export default {
  name: "Paracosm",
  props: ['paracosm'],

  data() {
    return {
      screenStyle: {
        color: null
      },
      tracks: this.paracosm.tracks.items
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
    artists: function(artistsList) {
      let artists= '';
      artistsList.forEach(artist => artists += artist.name + ', ')
      return artists.slice(0, -2);
    },

    applyTheme: function(theme) {
      this.screenStyle.color = theme.accent;
    }
  }
}
</script>

<style scoped>
#paracosm {
  margin-bottom: 50px;
  min-height: max-content;
}

#paracosm::after {
  content: "";
  display: block;
  clear: both;
}
#title-wrap {
  position: relative;
  display: table-cell;
}

#title {
  display: inline-block;
  margin-top: 0;
  margin-bottom: 5px;
  color: #ccc;
  vertical-align: middle;
  padding-top: 7px;
}

#title:hover {
  text-decoration: underline;
}

#spotify-logo {
  display: inline-block;
  width: 25px;
  margin-top: 0;
  margin-right: 5px;
  vertical-align: middle;
}

#image-wrap {
  width: 200px;
  height: 200px;
  position: relative;
  display: inline-block;
}

#image-wrap:hover #play {
  visibility: visible;
  opacity: 1;
}

#image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 20px;
  cursor: pointer;
  position: relative;
}

#play {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  top: 0;
  opacity: 0;
  transition: visibility 0s, opacity 0.3s linear;
}

#play img {
  display: block;
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  margin: auto;
}

#tracks {
  position: relative;
  float: right;
  width: calc(100% - 220px);
}

.track {
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px dotted #e6e6e6;
  font-size: 13px;
  cursor: pointer;
  transition: .5s;
  -moz-transition: .5s;
  -webkit-transition: .5s;
  -o-transition: .5s;
  display: inline-block;
  text-decoration: none;
}

.track:hover .track-name{
  text-decoration: underline;
}

.index {
  color: #777;
}

.artist {
  color: #777;
  font-size: 12px;
  margin-left: 15px;
}

@media only screen and (max-width: 1000px) {
  #tracks {
    float: none;
    width: 100%;
  }
}
</style>
