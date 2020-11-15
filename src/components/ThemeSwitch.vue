<template>
  <div id="theme-switch">
    <label class="switch" :title="switchTitle">
      <input type="checkbox" @click="toggleTheme" :checked="checked" />
      <span class="slider round" :style="sliderStyle"></span>
    </label>
  </div>
</template>

<script>
import { Theme } from '@/styles/Theme';
import { Events } from '@/Events';
import CookieManager from '@/util/CookieManager';

const themeCookie = 'theme';

export default {
  name: 'ThemeSwitch',

  data() {
    return {
      currentTheme: CookieManager.readCookie(themeCookie),
      sliderStyle: {}
    };
  },

  methods: {
    toggleTheme: function() {
      this.currentTheme = this.getTargetTheme();
      CookieManager.deleteCookie(themeCookie);
      CookieManager.createCookie(themeCookie, this.currentTheme, 365);

      this.$root.$emit(
        Events.THEME_CHANGED,
        this.$event,
        this.getThemeObject(this.currentTheme)
      );
    },

    getTargetTheme: function() {
      return this.currentTheme === Theme.light.name
        ? Theme.dark.name
        : Theme.light.name;
    },

    getThemeObject: function(themeName) {
      return themeName === Theme.light.name ? Theme.light : Theme.dark;
    }
  },

  computed: {
    checked: function() {
      return this.currentTheme === Theme.dark.name;
    },

    switchTitle: function() {
      return this.getTargetTheme() + ' mode';
    }
  }
};
</script>

<style lang="less" scoped>
#theme-switch {
  width: 30px;
}

.switch {
  position: relative;
  display: block;
  width: 30px;
  height: 18px;
  margin-bottom: 10px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e6e6e6;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 10px;
  width: 10px;
  left: 4px;
  bottom: 4px;
  background-color: #fefefe;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #3c3c3c;
}

input:checked + .slider:before {
  -webkit-transform: translateX(11px);
  -ms-transform: translateX(11px);
  transform: translateX(11px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 10px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
