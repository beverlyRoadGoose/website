<template>
  <div id="article">
    <NuxtLink :to="`/post/${this.article.fields.slug}`">
      <img
        :alt="this.article.fields.title"
        :src="`${this.article.fields.image[0].fields.file.url}`"
        class="image"
      />
      <h3 id="title" :style="titleStyle">{{ this.article.fields.title }}</h3>
    </NuxtLink>
  </div>
</template>

<script>
import CookieManager from '@/util/CookieManager';
import { Theme } from '@/util/Theme';
import { Events } from '@/util/Events';

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
  font-size: 1.5em;
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
