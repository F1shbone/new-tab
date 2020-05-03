<template>
  <div id="app">
    <wallpaper />

    <grid>
      <template v-slot:right>
        <clock />
      </template>
    </grid>
    <grid>
      <template v-slot:left>
        <bookmarks />
      </template>
      <template v-slot:right>
        <hacker-news />
      </template>
    </grid>
  </div>
</template>

<script>
import Wallpaper from './components/Wallpaper.vue';
import Grid from '@/components/grid/Layout.js';

import Bookmarks from './components/widgets/Bookmarks.vue';
import Clock from './components/widgets/Clock.vue';
import HackerNews from './components/widgets/HackerNews.vue';

export default {
  name: 'App',
  components: {
    Wallpaper,
    Grid,
    Bookmarks,
    Clock,
    HackerNews,
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  overflow: hidden;
}

*,
:after,
:before {
  box-sizing: inherit;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 2560px;
  margin-left: auto;
  margin-right: auto;
  color: #fff;

  > div:last-child {
    flex: 1 1 auto;
  }
}
</style>
