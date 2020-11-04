<template>
  <div id="app">
    <vue-page-transition name="fade-in-up">
      <router-view />
    </vue-page-transition>
  </div>
</template>

<style lang="less">
#app {
  padding: 0;
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
