<template>
  <div id="header-bar">
    <page-nav id="page-nav" :active="active"/>
    <theme-switch id="theme-switch" />
  </div>
</template>

<script>
import PageNav from '@/components/PageNav';
import ThemeSwitch from '@/components/ThemeSwitch';

export default {
  name: 'HeaderBar',
  props: ['active'],
  components: { ThemeSwitch, PageNav }
};
</script>

<style lang="less" scoped>
#header-bar {
  width: 100%;
  height: 50px;
  padding-top: 15px;
  padding-bottom: 15px;
  box-sizing: border-box;
  margin: auto;
  float: left;
}

#theme-switch {
  float: right;
  margin-top: 2px
}
</style>
