<template>
  <div id="blog" :style="screenStyle">
    <div id="content">
      <header-bar active="posts" />
      <div v-for="post in posts" :key="post.meta.id">
        <article-preview :article="post" />
      </div>
      <button id="load-more-btn" v-if="totalPosts > posts.length" @click="getPosts">
        {{ loading ? 'Loading...' : 'View more' }}
      </button>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar';
import { Events } from '@/util/Events';
import CookieManager from '@/util/CookieManager';
import { ComfortableApi } from '@/util/Comfortable';
import { Theme } from '@/util/Theme';
import ArticlePreview from '@/components/ArticlePreview';
import Me from '@/assets/img/me_beach.jpg';
import Comfortable from 'comfortable-javascript';

export default {
  name: 'posts',
  transition: {},
  components: { HeaderBar, ArticlePreview },
  head: {
    title: 'Tobi Adeyinka | Posts',
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
      { property: 'og:title', content: 'Tobi Adeyinka | Posts' },
      {
        property: 'og:description',
        content: "Hello. I'm Tobi, a Software Engineer currently based in Berlin."
      },
      { property: 'og:site_name', content: 'Tobi Adeyinka | Posts' },
      { property: 'og:type', content: 'website' },
      { name: 'robots', content: 'index,follow' },
      { property: 'og:url', content: 'https://heytobi.dev/posts' },
      { property: 'og:image', content: `https://heytobi.dev${Me}` }
    ]
  },

  created() {
    this.getPosts();
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

  data() {
    return {
      screenStyle: {
        background: null
      },
      posts: [],
      totalPosts: 0,
      loading: false
    };
  },

  methods: {
    track() {
      this.$gtag.pageview({
        page_path: '/posts'
      });
    },

    getPosts() {
      this.loading = true;

      const options = {
        embedAssets: true,
        limit: 10,
        offset: this.posts.length,
        sorting: new Comfortable.Sorting().add('date', 'desc')
      };

      ComfortableApi.getCollection('blogpost', options)
        .then(result => {
          this.posts.push(...result.data);
          this.totalPosts = result.meta.total;
          this.loading = false;
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

<style lang="less" scoped>

#blog {
  min-height: 100vh;
  transition: .5s;
  -moz-transition: .5s;
  -webkit-transition: .5s;
  -o-transition: .5s;
}

#content {
  width: 40%;
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
