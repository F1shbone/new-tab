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

const now = useNow()
const currentTime = useDateFormat(now, 'HH:mm', { locales: 'de-DE' })
const currentDay = computed(() => {
  const day = now.value.getDate()
  const month = now.value.getMonth()
  const dayName = now.value.toLocaleDateString('de-DE', {
    weekday: 'long',
  })
  return `${dayName} ${day}.${month}`
})
const activeTab = ref('hackernews')
</script>

<template>
  <!-- <main class="w-screen h-screen grid grid-cols-[1fr_30rem]"> -->
  <main class="w-screen h-screen">
    <div class="relative p-4">
      <h1 class="text-right text-white select-none text-7xl drop-shadow-xl">
        {{ currentTime }}
        <small class="block mt-1 text-3xl font-thin">{{ currentDay }}</small>
      </h1>
      <!-- <div class="flex justify-between">
        <div class="flex gap-4">
          <TBookmarks style="width: 850px" />
        </div>
        <div class="flex flex-col gap-4 w-96">
          <TMtgSpoilers />
          <TAlarmWatch />

          <button
            class="flex items-center justify-center gap-2 px-6 py-3 text-xl text-white transition-all bg-gray-800 rounded-lg hover:bg-gray-900"
          >
            <RiToolsFill />
            Settings
          </button>
        </div>
      </div> -->
    </div>
    <!--
    <div
      class="grid grid-rows-[auto,1fr] overflow-hidden border-l bg-white/40 backdrop-blur border-gray-500/30"
    >
      <VNavButton
        :active="activeTab"
        :items="[
          { text: 'Hackernews', value: 'hackernews' },
          { text: 'Warhammer', value: 'warhammer' },
        ]"
        @click="activeTab = $event"
      />

      <KeepAlive>
        <THackernews v-if="activeTab === 'hackernews'" />
      </KeepAlive>
      <TWarhammer v-if="activeTab === 'warhammer'" />
    </div>
    -->

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
