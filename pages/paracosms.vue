<template>
  <div id="paracosms" :style="screenStyle">
    <div id="content">
      <header-bar active="paracosms" />
      <div v-for="paracosm in paracosms" :key="paracosm.meta.id">
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
import ArticlePreview from '@/components/ArticlePreview';
import Paracosm from '@/components/Paracosm';
import Me from 'assets/img/me_beach.jpg';
import CookieManager from '@/util/CookieManager';
import { Theme } from '@/util/Theme';
import { Events } from '@/util/Events';
import { ComfortableApi } from '@/util/Comfortable';
import SpotifyWebApi from 'spotify-web-api-js'

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
        content: "Hello. I'm Tobi, a Software Engineer currently based in Berlin."
      },
      { property: 'og:title', content: 'Tobi Adeyinka | Paracosms' },
      {
        property: 'og:description',
        content: "Hello. I'm Tobi, a Software Engineer currently based in Berlin. Outside of programming, " +
            "I enjoy discovering good music, on this page, you can find the songs I've particlulary enjoyed as curated " +
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
    this.importSpotifySDK()
    this.parseSpotifytoken();
    this.setupSpotifyPlayback();
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
      spotify: {
        clientId: "9587f6e9528a467790509c5d9241fad2",
        token: null,
        scopes: "streaming user-read-email user-read-private",
        redirectUri: "http://localhost:3000/paracosms"
      },
      paracosms: [],
      totalParacosms: 0,
      loading: false
    };
  },

  methods: {
    importSpotifySDK() {
      const spotifySDK = document.createElement('script')
      spotifySDK.setAttribute('src', 'https://sdk.scdn.co/spotify-player.js')
      document.head.appendChild(spotifySDK)
    },

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

    setupSpotifyPlayback() {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new Spotify.Player({
          name: "Tobi's Paracosms",
          getOAuthToken: cb => { cb(this.spotify.token); }
        });

        // Error handling
        player.addListener('initialization_error', ({ message }) => { console.error(message); });
        player.addListener('authentication_error', ({ message }) => { console.error(message); });
        player.addListener('account_error', ({ message }) => { console.error(message); });
        player.addListener('playback_error', ({ message }) => { console.error(message); });

        // Playback status updates
        player.addListener('player_state_changed', state => { console.log(state); });

        // Ready
        player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
        });

        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });

        // Connect to the player!
        player.connect();
      };
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
        sorting: {
          'fields.date': 'DESC'
        }
      };

      ComfortableApi.getCollection('paracosm', options)
        .then(result => {
          this.totalParacosms = result.meta.total;
          this.loading = false;

          result.data.forEach((p) => {
            spotifyApi.getPlaylist(p.fields.spotifyPlaylistId)
              .then(function(data) {
                p.fields.playlist = data;
              }, function(err) {
                console.error(err);
              });
          });

          this.paracosms.push(...result.data)
        })
        .catch(err => {
          this.loading = false;
          throw err;
        });
    },

    applyTheme: function(theme) {
      document.body.style.background = theme.background;
      this.screenStyle.background = theme.background;
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

#content {
  width: 30%;
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
}

#load-more-btn:hover {
  background-color: #cdcdcd;
}
</style>
