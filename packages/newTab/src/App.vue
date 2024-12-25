<script setup lang="ts">
import { computed } from 'vue'
import { useDateFormat, useNow } from '@vueuse/core'

import TWallpaper from './components/TWallpaper.vue'

import TBookmarks from './components/widgets/TBookmarks.vue'
import TMtgSpoilers from './components/widgets/TMtgSpoilers.vue'
import TAlarmWatch from './components/widgets/TAlarmWatch.vue'
import TSettings from './components/widgets/TSettings.vue'
import THackernews from './components/widgets/THackernews.vue'
import TWarhammer from './components/widgets/TWarhammer.vue'

const now = useNow()
const currentTime = useDateFormat(now, 'HH:mm')
const currentDay = computed(() => {
  const day = now.value.getDate()
  const month = now.value.getMonth()
  const year = now.value.getFullYear()
  const dayName = now.value.toLocaleDateString('de-DE', {
    weekday: 'long',
  })
  return `${dayName}, ${day}.${month}.${year}`
})
</script>

<template>
  <main
    class="overscroll-contain w-screen h-screen grid xl:grid-cols-3 xl:gap-10 2xl:grid-cols-5 grid-rows-[7rem_1fr] 2xl:gap-4 p-4"
  >
    <h1
      class="text-right text-white select-none xl:col-start-2 2xl:col-start-4 text-7xl drop-shadow-xl"
    >
      {{ currentTime }}
      <small class="block mt-1 text-3xl font-thin">{{ currentDay }}</small>
    </h1>

    <div class="flex flex-col justify-between row-span-2 row-start-1 gap-4 2xl:col-span-2">
      <TBookmarks />

      <div class="flex flex-col gap-4 2xl:w-1/2">
        <TMtgSpoilers />
        <TAlarmWatch />
        <TSettings />
      </div>
    </div>

    <div class="row-span-2 row-start-1 xl:col-start-3 2xl:col-start-5">
      <THackernews />
    </div>

    <TWallpaper />
  </main>
</template>
