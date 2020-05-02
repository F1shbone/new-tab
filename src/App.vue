<template>
  <div id="app">
    <wallpaper />

    <div class="layout__container">
      <clock />
      <p>Placeholder</p>
    </div>
  </div>
</template>

<script>
import Clock from "./components/Clock.vue";
import Wallpaper from "./components/Wallpaper.vue";

export default {
  name: "App",
  components: {
    Clock,
    Wallpaper,
  },
};
</script>

<style lang="scss">
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
}
</style>
