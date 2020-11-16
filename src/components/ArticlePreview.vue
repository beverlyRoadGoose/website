<template>
  <div id="article">
    <router-link :to="`/blog/${this.article.fields.slug}`">
      <img
        :alt="this.article.fields.title"
        :src="`${this.article.fields.image[0].fields.file.url}`"
        class="image"
      />
      <h2 id="title" :style="titleStyle">{{ this.article.fields.title }}</h2>
    </router-link>
  </div>
</template>

<script>
import CookieManager from '@/util/CookieManager';
import { Theme } from '@/styles/Theme';
import { Events } from '@/Events';

export default {
  name: 'ArticlePreview',
  props: ['article'],

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
      titleStyle: {
        color: null
      }
    };
  },

  methods: {
    applyTheme: function(theme) {
      this.titleStyle.color = theme.accent;
    }
  }
};
</script>

<style lang="less" scoped>
#article {
  margin-bottom: 10px;
}

#title {
  display: inline-block;
  text-align: left;
  width: 100%;
}

.image {
  width: 100%;
  border-radius: 5px;
}

#title {
  margin-top: 0;
  padding-top: 0;
}

#article:hover #title {
  text-decoration: underline;
}
</style>
