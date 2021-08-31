<template>
  <div id="paracosm">
    <a :href="this.paracosm.spotify_url" target="_blank">
      <img id="image" :src="this.paracosm.img" :alt="'Paracosm ' + this.paracosm.title" :title="'Paracosm ' + this.paracosm.title"/>
    </a>
    <div id="tracks">
      <a :href="this.paracosm.spotify_url" target="_blank" title="View Playlist on Spotify"><h2 id="title">{{ this.paracosm.title }}</h2><br /></a>
      <a :href="track.track.external_urls.spotify" class="track" v-for="(track, index) in tracks" :key="track.track.id" title="View Track on Spotify">
        <span class="index">{{ index + 1 }}.</span> <span class="trackName" :style="screenStyle">{{ track.track.name }}</span><br />
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

#title {
  display: inline-block;
  margin-top: 5px;
  margin-bottom: 5px;
  color: #ccc;
}

#title:hover {
  text-decoration: underline;
}

#image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 20px;
  cursor: pointer;
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

.track:hover .trackName{
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
  #paracosm {
    margin-bottom: 20px;
  }

  #image {
    width: 100%;
    height: auto;
  }

  #tracks {
    float: none;
    width: 100%;
  }
}
</style>
