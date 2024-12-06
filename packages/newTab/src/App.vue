<script setup lang="ts">
import { useDateFormat, useNow } from '@vueuse/core'

import TWallpaper from './components/TWallpaper.vue'
import TMtgSpoilers from './components/TMtgSpoilers.vue'

const formatted = useDateFormat(useNow(), 'HH:mm:ss')
</script>

<template>
  <main class="w-screen h-screen">
    <div class="w-full h-full grid grid-cols-[1fr_30rem]">
      <div class="relative p-4">
        <TMtgSpoilers />

        <TWallpaper />
      </div>
      <div class="dark:bg-gray-800 dark:text-slate-50">Sidebar?</div>
    </div>
    <!--
      - Widget Bookmarks
      - Widget Hackernews
      - Widget Warhammer Community
      - Widget Current MTG Spoilers
      - Widget Stop Watch
      - Settings
      -->
  </main>
</template>

<style scoped>
/*  */
</style>
