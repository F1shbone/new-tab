<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDateFormat, useNow } from '@vueuse/core'
import { RiToolsFill } from '@remixicon/vue'

import TWallpaper from './components/TWallpaper.vue'
import TMtgSpoilers from './components/TMtgSpoilers.vue'
import TAlarmWatch from './components/TAlarmWatch.vue'

import TBookmarks from './components/TBookmarks.vue'
import THackernews from './components/THackernews.vue'
import TWarhammer from './components/TWarhammer.vue'
import VNavButton from './components/VNavButton.vue'
import TButton from './components/TButton.vue'
import TCard from './components/TCard.vue'

const now = useNow()
const currentTime = useDateFormat(now, 'HH:mm', { locales: 'de-DE' })
const currentDay = computed(() => {
  const day = now.value.getDate()
  const month = now.value.getMonth()
  const year = now.value.getFullYear()
  const dayName = now.value.toLocaleDateString('de-DE', {
    weekday: 'long',
  })
  return `${dayName}, ${day}.${month}.${year}`
})
const activeTab = ref('hackernews')
</script>

<template>
  <main class="w-screen h-screen grid grid-cols-5 grid-rows-[7rem_1fr] gap-4 p-4">
    <h1 class="col-start-4 text-right text-white select-none text-7xl drop-shadow-xl">
      {{ currentTime }}
      <small class="block mt-1 text-3xl font-thin">{{ currentDay }}</small>
    </h1>

    <div class="flex flex-col justify-between col-span-2 row-span-2 row-start-1 gap-4">
      <TBookmarks />

      <div class="flex flex-col w-1/2 gap-4">
        <TMtgSpoilers />
        <TAlarmWatch />
        <TButton block variant="secondary" size="lg">
          <RiToolsFill class="w-6 h-6" />
          Settings
        </TButton>
      </div>
    </div>

    <TCard flush class="col-start-5 row-span-2 row-start-1">
      <THackernews />
    </TCard>

    <TWallpaper />
  </main>
</template>
