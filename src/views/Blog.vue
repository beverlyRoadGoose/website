<template>
  <div id="blog" :style="screenStyle">
    <div id="content">
      <header-bar active="home" />
      <div v-for="post in posts" :key="post.meta.id">
        <article-preview :article="post" />
      </div>
      <button
        id="load-more-btn"
        v-if="totalPosts > posts.length"
        @click="getPosts"
      >
        {{ loading ? 'Loading...' : 'Load more' }}
      </button>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar';
import { Events } from '@/Events';
import CookieManager from '@/util/CookieManager';
import { ComfortableApi } from '@/util/Comfortable';
import { Theme } from '@/styles/Theme';
import ArticlePreview from '@/components/ArticlePreview';
import Me from '@/assets/me_beach.jpg';

export default {
  name: 'Blog',
  components: { HeaderBar, ArticlePreview },
  metaInfo: {
    title: 'Tobi Adeyinka | Blog',
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
      { property: 'og:title', content: 'Tobi Adeyinka | Blog' },
      { property: 'og:site_name', content: 'Tobi Adeyinka | Blog' },
      { property: 'og:type', content: 'website' },
      { name: 'robots', content: 'index,follow' },
      { property: 'og:url', content: 'https://heytobi.dev/blog' },
      { property: 'og:image', content: `https://heytobi.dev${Me}` }
    ]
  },

  created() {
    this.getPosts();
  },

  mounted() {
    this.applyTheme(
      CookieManager.readCookie('theme') === 'light' ? Theme.light : Theme.dark
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
        page_path: '/blog'
      });
    },

    getPosts() {
      this.loading = true;

      const options = {
        embedAssets: true,
        limit: 10,
        offset: this.posts.length,
        sorting: {
          'fields.date': 'DESC'
        }
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
@import '../styles/base';

#blog {
  min-height: 100vh;
  .transitions;
}

#content {
  width: 30%;
  margin: auto;
  .transitions;
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
  .transitions;
}

#load-more-btn:hover {
  background-color: #cdcdcd;
}
</style>
