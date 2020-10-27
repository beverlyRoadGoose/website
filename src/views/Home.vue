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
    this.$router.push("hello");
  }
};
</script>

<style scoped>
#vue-headful {
  visibility: hidden;
}
</style>
