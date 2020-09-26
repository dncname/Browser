<template>
  <div id="app">
    <pubHeader></pubHeader>
    <router-view />
    <pubFooter></pubFooter>
  </div>
</template>
<script>
import pubHeader from "@/components/pub_header.vue"
import pubFooter from "@/components/pub_footer.vue"
export default {
  components: {
    pubHeader,
    pubFooter
  },
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.json-view-container {
  background: #f8f8f8 !important;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
