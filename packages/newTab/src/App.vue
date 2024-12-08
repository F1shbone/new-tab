<script setup lang="ts">
import { useDateFormat, useNow } from '@vueuse/core'
import { RiToolsFill } from '@remixicon/vue'

import TWallpaper from './components/TWallpaper.vue'
import TMtgSpoilers from './components/TMtgSpoilers.vue'
import TAlarmWatch from './components/TAlarmWatch.vue'

import THackernews from './components/THackernews.vue'

const formatted = useDateFormat(useNow(), 'HH:mm')
</script>

<template>
  <main class="w-screen h-screen grid grid-cols-[1fr_30rem]">
    <div class="relative p-4">
      <h1 class="my-6 text-right text-white select-none text-7xl drop-shadow-xl">
        {{ formatted }}
      </h1>
      <div class="flex justify-between">
        <div>!!</div>
        <div class="flex flex-col gap-4 w-96">
          <!-- <TMtgSpoilers /> -->
          <TAlarmWatch />

          <button
            class="flex items-center justify-center gap-2 px-6 py-3 text-xl text-white transition-all bg-gray-800 rounded-lg hover:bg-gray-900"
          >
            <RiToolsFill />
            Settings
          </button>
        </div>
      </div>
    </div>
    <div class="overflow-hidden border-l bg-white/40 backdrop-blur border-gray-500/30">
      <THackernews />
    </div>

    <TWallpaper />
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
