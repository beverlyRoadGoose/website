<template>
  <div id="theme-switch">
    <label class="switch" :title="switchTitle">
      <input type="checkbox" @click="toggleTheme" />
      <span class="slider round"></span>
    </label>
  </div>
</template>

<script>
import { Theme } from '@/styles/Theme';
import CookieManager from '@/util/CookieManager';

const themeCookie = 'theme';

export default {
  name: 'ThemeSwitch',

  data() {
    return {
      currentTheme: CookieManager.readCookie(themeCookie)
    };
  },

  methods: {
    toggleTheme: function() {
      this.currentTheme = this.getTargetTheme();
      CookieManager.deleteCookie(themeCookie);
      CookieManager.createCookie(themeCookie, this.currentTheme, 365);
    },

    getTargetTheme: function() {
      return this.currentTheme === Theme.light.name
        ? Theme.dark.name
        : Theme.light.name;
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
.switch {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 18px;
  margin-bottom: 10px;
  float: left;
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
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #0c0c0c;
}

input:checked + .slider:before {
  -webkit-transform: translateX(12px);
  -ms-transform: translateX(12px);
  transform: translateX(12px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 10px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
