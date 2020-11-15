<template>
  <div id="blog-post">
    <div id="vue-headful">
      <vue-headful title="Tobi Adeyinka | Blog" /><!--Todo dynamic page title-->
    </div>
    <div id="content">
      <header-bar />
      <transition name="fade"> </transition>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar';

export default {
  name: 'BlogPost',
  components: { HeaderBar }
};
</script>

<style scoped></style>
