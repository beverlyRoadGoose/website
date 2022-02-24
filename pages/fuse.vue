<template>
  <!-- This component only exists to allow the resolution of my fuse golang library to be resolved by the "go get" command -->
</template>

<script>
export default {
  name: 'fuse',
  meta: [
    { name: 'go-import', content: "golang.org/x/tools git http://github.com/beverlyRoadGoose/fuse" }
  ]
}
</script>
