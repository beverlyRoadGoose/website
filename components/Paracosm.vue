<template>
  <div id="paracosm">
    <h2 id="title">{{ this.paracosm.fields.title }}</h2><br />
    <img id="image" :src="this.imageUrl" alt="Paracosm 000" title="Paracosm 000"/>
  </div>
</template>

<script>
import CookieManager from '@/util/CookieManager';
import {Theme} from '@/util/Theme';
import {Events} from '@/util/Events';

export default {
  name: "Paracosm",
  props: ['paracosm'],

  mounted() {
    this.applyTheme(
        CookieManager.readCookie('theme') === 'light' ? Theme.light : Theme.dark
    );
    this.$root.$on(Events.THEME_CHANGED, (event, theme) => {
      this.applyTheme(theme);
    });
  },

  methods: {


    applyTheme: function(theme) {
    }
  },

  computed: {
    imageUrl: function() {
      console.log(this.paracosm.fields);
      return this.paracosm.fields.playlist.images[0].url;
    },
  }
}
</script>

<style scoped>
#paracosm {
}

#title {
  display: inline-block;
  margin-top: 5px;
  margin-bottom: 5px;
}

#image {
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 5px;
}
</style>
