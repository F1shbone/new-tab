<script setup lang="ts">
import { useDateFormat, useNow } from '@vueuse/core'

import TWallpaper from './components/TWallpaper.vue'
import TMtgSpoilers from './components/TMtgSpoilers.vue'
import TStopwatch from './components/TStopwatch.vue'

const formatted = useDateFormat(useNow(), 'HH:mm:ss')
</script>

<template>
  <main class="w-screen h-screen">
    <div class="w-full h-full grid grid-cols-[1fr_30rem]">
      <div class="relative p-4">
        <div class="flex justify-between">
          <div>!!</div>
          <div class="flex flex-col gap-4 w-96">
            <h1 class="text-right text-white select-none text-7xl drop-shadow-xl">
              {{ formatted }}
            </h1>
            <TMtgSpoilers />
            <TStopwatch />

            <button class="px-6 py-3 text-xl text-white bg-gray-800 rounded-lg">Settings</button>
          </div>
        </div>

        <TWallpaper />
      </div>
      <div class="dark:bg-gray-800 dark:text-slate-50">Sidebar?</div>
    </div>
    <!--
      - Widget Bookmarks
      - Widget Hackernews
      - Widget Warhammer Community
      - Widget Stop Watch
      - Settings
      -->
  </main>
</template>

<style scoped>
/*  */
</style>
