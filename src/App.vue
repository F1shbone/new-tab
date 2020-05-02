<template>
  <div id="app">
    <wallpaper />

    <grid>
      <template v-slot:left>
        <p>Placeholder</p>
      </template>
      <template v-slot:right>
        <clock />
        <hacker-news />
      </template>
    </grid>
  </div>
</template>

<script>
import Wallpaper from './components/Wallpaper.vue';
import Grid from '@/components/grid/Layout.js';

import Clock from './components/widgets/Clock.vue';
import HackerNews from './components/widgets/HackerNews.vue';

export default {
  name: 'App',
  components: {
    Wallpaper,
    Grid,
    Clock,
    HackerNews,
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #fff;
  // margin-top: 60px;
}
</style>
