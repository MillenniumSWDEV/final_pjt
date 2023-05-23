<template>
  <div id="app">
    <NavBar />
    <div style="height: 880px; overflow: hidden">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/Utils/NavBar/NavBar.vue";

export default {
  components: {
    NavBar,
  },
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
}

html {
  scroll-snap-type: y mandatory;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #e8f7fd;
  color: #2c3e50;
  width: 100%;
  height: 100%;

  scroll-snap-align: center;
  scroll-snap-stop: always;
  overflow: hidden;
  margin: 0 auto;
}
</style>
