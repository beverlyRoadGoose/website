<template>
  <div id="blog-post" v-if="post && author" :style="screenStyle">
    <div id="content">
      <div id="header-wrap">
        <header-bar />
      </div>
    </div>
    <div id="image-wrap" :style="articleImage"></div>
    <div id="article-wrap" :style="articleStyle">
      <h2 id="title">{{ this.post.fields.title }}</h2>
      <div class="author">
        <img
          :src="`${author.fields.avatar[0].fields.file.url}?w=300&h=300`"
          alt="author.fields.name"
        />
        <b>{{ author.fields.name }}</b><br /><span id="post-date">{{ this.postDate }}</span>
      </div>
      <div id="article" v-html="post.fields.content.html"></div>
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
import highlight from 'highlight.js';
import 'highlight.js/styles/an-old-hope.css'; //https://highlightjs.org/static/demo/
import dayjs from 'dayjs';
import Me from '@/assets/me_beach.jpg';

export default {
  name: 'BlogPost',
  props: ['article'],
  components: { HeaderBar },

  data() {
    return {
      post: null,
      author: null,
      screenStyle: {
        background: null
      },
      articleStyle: {
        color: null,
        background: null
      },
      articleImage: {
        'background-image': null
      }
    };
  },

  metaInfo() {
    return {
      title:
        this.post === null
          ? 'Tobi Adeyinka | Blog'
          : `Tobi Adeyinka | ${this.post.fields.title}`,
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        {
          property: 'og:title',
          content:
            this.post === null ? 'Tobi Adeyinka | Blog' : this.post.fields.title
        },
        {
          property: 'og:description',
          content:
            "Hello &#128075;&#127998;. I'm Tobi, a Software Engineer currently based in Berlin."
        },
        { property: 'og:site_name', content: 'Tobi Adeyinka | Blog' },
        { property: 'og:type', content: 'article' },
        {
          property: 'og:url',
          content:
            this.post === null
              ? 'https://heytobi.dev/blog'
              : `https://heytobi.dev/blog/${this.post.fields.slug}`
        },
        {
          property: 'og:image',
          content:
            this.post === null
              ? `https://heytobi.dev${Me}`
              : this.post.fields.image[0].fields.file.url
        },
        { name: 'robots', content: 'index,follow' }
      ]
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

  updated() {
    let images = document.getElementById('article').getElementsByTagName('img');
    let i = 0;
    for (i; i < images.length; i++) {
      images[i].style.width = '100%';
      images[i].style.borderRadius = '3px';
    }
    this.styleCodeBlocks();
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

          let img = this.post.fields.image[0].fields.file.url;
          this.articleImage = {
            'background-image': 'url(' + img + ')'
          };

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
    },

    /*
     * For styling code blocks, comfortable.io doesn't wrap snippets in code blocks so we have to get
     * all code all pre blocks and manually wrap them in code blocks ourselves, we do these so we can
     * make use of syntax highlighters. Also apply further styling to the pre blocks.
     */
    styleCodeBlocks: function() {
      let code = document.getElementById('article').getElementsByTagName('pre');
      let i = 0;
      for (i; i < code.length; i++) {
        code[i].innerHTML = '<code>' + code[i].innerHTML + '</code>';
        code[i].style.width = '100%';
        code[i].style.overflowX = 'scroll';
        code[i].style.borderRadius = '3px';

        let codeBlock = code[i].getElementsByTagName('code')[0];
        highlight.highlightBlock(codeBlock);
      }
    }
  },

  computed: {
    postDate: function() {
      return dayjs(this.post.fields.date).format('MMMM D, YYYY');
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
  padding-top: 10px;
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

#title {
  text-align: left;
}

#article {
  text-align: left;
  font-size: 0.9em;
}

.author {
  font-size: 0.8em;
  text-align: left;
  margin-bottom: 20px;
  margin-top: -10px;
}

.author img {
  display: inline-block;
  margin-bottom: -10px;
  margin-right: 5px;
  border-radius: 50%;
  float: left;
  width: 35px;
  height: 35px;
}

#image-wrap {
  width: 100%;
  height: 300px;
  overflow: hidden;
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: center;
  filter: brightness(60%);
}

@media only screen and (min-width: 1000px) {
  #image-wrap {
    height: 450px;
  }
}

.ql-syntax {
  white-space: pre-wrap;
  overflow-wrap: break-word;
}

#post-date {
  font-size: 0.8em;
}
</style>
