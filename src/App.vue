<script setup lang="ts">
import TWallpaper from './components/TWallpaper.vue'

import TClock from './components/widgets/TClock.vue'
import TBookmarks from './components/widgets/TBookmarks.vue'
import TScryfall from './components/widgets/TScryfall.vue'
import TAlarmClock from './components/widgets/TAlarmClock.vue'
import TSettings from './components/widgets/TSettings.vue'
import THackernews from './components/widgets/THackernews.vue'
import TWarhammer from './components/widgets/TWarhammer.vue'

import { useAlarmClockStore } from '@/stores/alarmclock'

const alarmclock = useAlarmClockStore()
</script>

<template>
  <main
    class="container__base overscroll-contain w-full h-full overflow-y-auto grid grid-cols-[1fr_16rem_33.3334%] grid-rows-[7rem_1fr] gap-4"
  >
    <div class="col-start-2 row-span-2 container__clock">
      <TClock />
    </div>

    <div class="flex flex-col justify-between row-span-2 row-start-1 gap-4 container__widgets">
      <TBookmarks />

      <div class="flex flex-col gap-4 widgets">
        <TScryfall />
        <TAlarmClock v-if="alarmclock.enabled" />
        <TSettings />
      </div>
    </div>

    <div class="col-start-3 row-span-2 row-start-1 container__right">
      <THackernews />
    </div>

    <TWallpaper />
  </main>
</template>

<style>
/* xl */
@media (min-width: 1280px) and (max-resolution: 1x) {
  .container__base {
    @apply gap-10;
  }
}
/* 2xl */
@media (min-width: 1536px) and (max-resolution: 1x) {
  .container__base {
    @apply grid-cols-5;
    @apply gap-4;
  }
  .container__clock {
    @apply col-start-4;
  }
  .container__widgets {
    @apply col-span-2;
  }
  .container__right {
    @apply col-start-5;
  }
  .widgets {
    @apply w-1/2;
  }
}
</style>
