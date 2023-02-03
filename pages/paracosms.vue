<template>
  <div id="paracosms" :style="screenStyle">
    <div id="content">
      <header-bar active="paracosms" />

      <div id="intro" :style="introStyle">On this page is a collection of my favorite songs, grouped together as small
        (in most cases) playlists that I like to call Paracosms.<sup><a href="https://en.wikipedia.org/wiki/Paracosm" target="_blank" style="text-decoration:none">?</a></sup></div>

      <div class="paracosm" v-for="paracosm in sortedParacosms" :key="paracosm.spotifyPlaylistId">
        <paracosm :paracosm="paracosm"/>
      </div>
      <button id="load-more-btn" v-if="totalParacosms > paracosms.length" @click="getParacosms">
        {{ loading ? 'Loading...' : 'View more' }}
      </button>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar';
import Paracosm from '@/components/Paracosm';
import Me from 'assets/img/me.jpg';
import CookieManager from '@/util/CookieManager';
import { Theme } from '@/util/Theme';
import { Events } from '@/util/Events';
import { ComfortableApi } from '@/util/Comfortable';
import SpotifyWebApi from 'spotify-web-api-js'
import Comfortable from 'comfortable-javascript';

export default {
  name: "paracosms",
  transition: {},
  components: { HeaderBar, Paracosm },
  head: {
    title: 'Tobi Adeyinka | Paracosms',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'description',
        content: "Hello. I'm Tobi, a Software Engineer currently based in Berlin. Outside of programming, " +
            "I enjoy discovering good music. On this page, you'll find my favorite songs as curated " +
            "playlists that I like to call Paracosms."
      },
      { property: 'og:title', content: 'Tobi Adeyinka | Paracosms' },
      {
        property: 'og:description',
        content: "Hello. I'm Tobi, a Software Engineer currently based in Berlin. Outside of programming, " +
            "I enjoy discovering good music. On this page, you'll find my favorite songs as curated " +
            "playlists that I like to call Paracosms."
      },
      { property: 'og:site_name', content: 'Tobi Adeyinka | Paracosms' },
      { property: 'og:type', content: 'website' },
      { name: 'robots', content: 'index,follow' },
      { property: 'og:url', content: 'https://heytobi.dev/paracosms' },
      { property: 'og:image', content: `https://heytobi.dev${Me}` }
    ]
  },

  beforeMount() {
    this.parseSpotifytoken();
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

    if (!this.$route.fullPath.includes("access_token")) {
      this.spotifyAuth();
    }

    this.getParacosms();
  },

  data() {
    return {
      screenStyle: {
        background: null
      },
      introStyle: {
        color: null
      },
      spotify: {
        clientId: "9587f6e9528a467790509c5d9241fad2",
        token: null,
        scopes: "",
        redirectUri: "https://heytobi.dev/paracosms" // TODO implement dynamic host
      },
      paracosms: [],
      totalParacosms: 0,
      loading: false
    };
  },

  methods: {
    spotifyAuth() {
      let url = "https://accounts.spotify.com/authorize?response_type=token&client_id="
          + this.spotify.clientId + "&redirect_uri=" + this.spotify.redirectUri + "&scope=" + this.spotify.scopes;
      window.location.href = url
    },

    parseSpotifytoken() {
      if (!this.$route.fullPath.includes("access_token")) {
        this.$router.push('/');
      }

      let hashSections = this.$route.hash.split('&')
      this.spotify.token = (hashSections[0].split('='))[1]
    },

    track() {
      this.$gtag.pageview({
        page_path: '/paracosms'
      });
    },

    getParacosms() {
      this.loading = true;
      let self = this;
      let spotifyApi = new SpotifyWebApi();
      spotifyApi.setAccessToken(this.spotify.token);

      const options = {
        embedAssets: true,
        limit: 10,
        offset: this.paracosms.length,
        sorting: new Comfortable.Sorting().add('number', 'desc')
      };

      ComfortableApi.getCollection('paracosm', options).then(result => {
        this.totalParacosms = result.meta.total;
        this.loading = false;

        result.data.forEach((p) => {
          spotifyApi.getPlaylist(p.fields.spotifyPlaylistId)
            .then(data => {
              p.fields.img = data.images[0].url
              p.fields.spotify_url = data.external_urls.spotify
              p.fields.tracks = data.tracks
              this.paracosms.push(p.fields)
            })
            .catch(err => console.log(err));
        });
      }).catch(err => {
        this.loading = false;
        throw err;
      });
    },

    applyTheme: function(theme) {
      document.body.style.background = theme.background;
      this.screenStyle.background = theme.background;
      this.introStyle.color = theme.accent;
    }
  },

  computed: {
    sortedParacosms: function(a) {
      return this.paracosms.sort(function(a, b) {
        return b.number - a.number;
      });
    }
  }
};
</script>

<style scoped>
#paracosms {
  min-height: 100vh;
  transition: .5s;
  -moz-transition: .5s;
  -webkit-transition: .5s;
  -o-transition: .5s;
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

#content {
  width: 35%;
  margin: auto;
  transition: .5s;
  -moz-transition: .5s;
  -webkit-transition: .5s;
  -o-transition: .5s;
}

#load-more-btn {
  display: block;
  padding: 7px;
  border-radius: 3px;
  cursor: pointer;
  outline: none;
  background-color: #e6e6e6;
  border: 1px solid #cdcdcd;
  transition: .5s;
  -moz-transition: .5s;
  -webkit-transition: .5s;
  -o-transition: .5s;
  margin-bottom: 50px;
}

#load-more-btn:hover {
  background-color: #cdcdcd;
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
