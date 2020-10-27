<template>
  <div>
    <div id="vue-headful">
      <vue-headful title="Tobi Adeyinka" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",

  mounted() {
    // load the image  of me fully before moving to hello route, for better UX
    new Image().src = "@/assets/me.jpg";
    this.$router.push("hello");
  }
};
</script>

<style scoped>
#vue-headful {
  visibility: hidden;
}
</style>
