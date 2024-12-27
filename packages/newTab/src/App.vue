<script setup lang="ts">
import TWallpaper from './components/TWallpaper.vue'

import TClock from './components/widgets/TClock.vue'
import TBookmarks from './components/widgets/TBookmarks.vue'
import TScryfall from './components/widgets/TScryfall.vue'
import TAlarmClock from './components/widgets/TAlarmClock.vue'
import TSettings from './components/widgets/TSettings.vue'
import THackernews from './components/widgets/THackernews.vue'
import TWarhammer from './components/widgets/TWarhammer.vue'
</script>

<template>
  <main
    class="overscroll-contain overflow-y-auto w-screen h-screen grid xl:grid-cols-3 xl:gap-10 2xl:grid-cols-5 grid-rows-[7rem_1fr] 2xl:gap-4 p-4"
  >
    <TClock class="xl:col-start-2 2xl:col-start-4" />

    <div class="flex flex-col justify-between row-span-2 row-start-1 gap-4 2xl:col-span-2">
      <TBookmarks />

      <div class="flex flex-col gap-4 2xl:w-1/2">
        <TScryfall />
        <TAlarmClock />
        <TSettings />
      </div>
    </div>

    <div class="row-span-2 row-start-1 xl:col-start-3 2xl:col-start-5">
      <THackernews />
    </div>

    <TWallpaper />
  </main>
</template>
