<template>
  <div id="blog-post" v-if="this.post && this.author" :style="this.screenStyle">
    <div id="content">
      <div id="header-wrap">
        <header-bar />
      </div>
    </div>
    <div id="image-wrap" :style="this.articleImage"></div>
    <div id="article-wrap" :style="this.articleStyle">
      <h2 id="title">{{ this.post.fields.title }}</h2>
      <div class="author">
        <img
          :src="`${this.author.fields.avatar[0].fields.file.url}?w=300&h=300`"
          alt="author.fields.name"
        />
        <b>{{ author.fields.name }}</b><br /><span id="post-date">{{ this.postDate }}</span>
      </div>
      <div id="article" v-html="this.post.fields.content.html"></div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar';
import Comfortable from 'comfortable-javascript';
import { ComfortableApi } from '@/util/Comfortable';
import _ from 'lodash';
import CookieManager from '@/util/CookieManager';
import { Theme } from '@/util/Theme';
import { Events } from '@/util/Events';
import highlight from 'highlight.js';
import 'highlight.js/styles/base16/bright.css'; //https://highlightjs.org/static/demo/
import dayjs from 'dayjs';

export default {
  name: 'post',
  transition: {},
  props: ['article'],
  components: { HeaderBar },

  async asyncData({ route }) {
    let data = null;

    const options = {
      embedAssets: true,
      includes: 1,
      filters: new Comfortable.Filter().addAnd(
          'slug',
          'equal',
          route.params.slug
      )
    };

    await ComfortableApi.getDocuments(options)
      .then(result => {
        let post = result.data[0];
        let image = post.fields.image[0].fields.file.url;
        let author = _.find(result.includes.author, {
          meta: { id: post.fields.author.meta.id }
        });

        data =  {
          post: post,
          author: author,
          image: image,
          screenStyle: {
            background: null
          },
          articleStyle: {
            color: null,
            background: null
          },
          articleImage: {},
        };
      })
      .catch(err => { throw err; });

    return data;
  },

  head() {
    return {
      title: `Tobi Adeyinka | ${this.post.fields.title}`,
      meta: [
        { charset: 'utf-8' },
        {
          name: 'description',
          content: "Hello. I'm Tobi, a Software Engineer currently based in Berlin."
        },
        { property: 'og:title', content: this.post.fields.title},
        {
          property: 'og:description',
          content: "Hello. I'm Tobi, a Software Engineer currently based in Berlin."
        },
        { property: 'og:site_name', content: 'Tobi Adeyinka | Posts' },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: `https://heytobi.dev/post/${this.post.fields.slug}`},
        { property: 'og:image', content: this.image },
        { name: 'robots', content: 'index,follow' }
      ]
    };
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
        page_path: '/post/' + this.post.fields.title
      });
    },

    applyTheme: function(theme) {
      document.body.style.background = theme.background;
      this.screenStyle.background = theme.background;
      this.articleStyle.color = theme.accent;
      this.articleStyle.background = theme.background;
      this.articleImage = {
        'background-image': 'url(' + this.image + ')'
      };
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
        code[i].style.borderRadius = '3px';
        code[i].style.marginTop = '15px';
        code[i].style.marginBottom = '15px';

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

#blog-post {
  min-height: 100vh;
  padding-bottom: 50px;
  transition: .5s;
  -moz-transition: .5s;
  -webkit-transition: .5s;
  -o-transition: .5s;
}

#header-wrap {
  width: 45%;
  margin: auto;
}

#article-wrap {
  width: 45%;
  margin: auto;
  padding-top: 10px;
  transition: .5s;
  -moz-transition: .5s;
  -webkit-transition: .5s;
  -o-transition: .5s;
}

#title {
  text-align: left;
}

#article {
  text-align: left;
  font-size: .9em;
  font-weight: 500;
  line-height: 20px;
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


.ql-syntax {
  white-space: pre-wrap;
  overflow-wrap: break-word;
}

#post-date {
  font-size: 10px;
  font-weight: 500;
}

@media only screen and (min-width: 1000px) {
  #image-wrap {
    height: 450px;
  }
}

@media only screen and (max-width: 1000px) {
  #header-wrap {
    width: 80%;
  }

  #article-wrap {
    width: 80%;
  }
}

@media only screen and (min-width: 1500px) {
  #article {
    font-size: 1em;
  }
}
</style>
