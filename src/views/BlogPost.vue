<template>
  <div id="blog-post" v-if="post && author" :style="screenStyle">
    <div id="vue-headful">
      <vue-headful :title="`Tobi Adeyinka | ${this.post.fields.title}`" />
    </div>
    <div id="content">
      <div id="header-wrap">
        <header-bar />
      </div>
    </div>
    <div id="image-wrap">
      <img
        :alt="this.post.fields.title"
        :src="`${post.fields.image[0].fields.file.url}`"
        id="image"
      />
    </div>
    <div id="article-wrap" :style="articleStyle">
      <h2 id="title">{{ this.post.fields.title }}</h2>
      <div id="article" v-html="post.fields.content.html"></div>
      <div class="author">
        <img
          :src="`${author.fields.avatar[0].fields.file.url}?w=30&h=30&fit=crop`"
          alt="author.fields.name"
        />
        by {{ author.fields.name }}
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar';
import Comfortable from 'comfortable-javascript';
import { ComfortableApi } from '@/util/Comfortable';
import _ from 'lodash';
import CookieManager from '@/util/CookieManager';
import { Theme } from '@/styles/Theme';
import { Events } from '@/Events';

export default {
  name: 'BlogPost',
  props: ['article'],
  components: { HeaderBar },

  data() {
    return {
      screenStyle: {
        background: null
      },
      articleStyle: {
        color: null,
        background: null
      },
      post: null,
      author: null
    };
  },

  created() {
    this.getPost();
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
    track() {
      this.$gtag.pageview({
        page_path: '/blog/' + this.post.fields.title
      });
    },

    getPost() {
      const options = {
        embedAssets: true,
        includes: 1,
        filters: new Comfortable.Filter().addAnd(
          'slug',
          'equal',
          this.$route.params.slug
        )
      };

      ComfortableApi.getDocuments(options)
        .then(result => {
          this.post = result.data[0];
          this.author = _.find(result.includes.author, {
            meta: { id: this.post.fields.author.meta.id }
          });
        })
        .catch(err => {
          throw err;
        });
    },

    applyTheme: function(theme) {
      document.body.style.background = theme.background;
      this.screenStyle.background = theme.background;
      this.articleStyle.color = theme.accent;
      this.articleStyle.background = theme.background;
    }
  }
};
</script>

<style lang="less" scoped>
@import '../styles/base';

#blog-post {
  min-height: 100vh;
  padding-bottom: 50px;
  .transitions;
}

#header-wrap {
  width: 45%;
  margin: auto;
}

#article-wrap {
  width: 45%;
  margin: auto;
  .transitions;
}

@media only screen and (max-width: 1000px) {
  #header-wrap {
    width: 80%;
  }

  #article-wrap {
    width: 80%;
  }
}

#image {
  display: block;
  width: 100%;
  height: auto;
}

#title {
  text-align: left;
}

#article {
  text-align: left;
}

.author {
  font-size: 0.8em;
  text-align: left;
}

.author img {
  display: inline-block;
  margin-bottom: -10px;
  margin-right: 5px;
  border-radius: 50%;
}

@media only screen and (min-width: 1000px) {
  #image-wrap {
    width: 100%;
    height: 600px;
    overflow: hidden;
  }

  #image-wrap img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
}
</style>
