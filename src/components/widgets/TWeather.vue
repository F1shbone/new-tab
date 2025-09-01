<script setup lang="ts">
import { RiRefreshLine } from '@remixicon/vue'

import TCard from '@/components/TCard.vue'
import TButton from '@/components/TButton.vue'
import { useFetch } from '@/composables/useFetch'
import { useWeatherStore } from '@/stores/weather'

const weatherSettings = useWeatherStore()
//
</script>

<template>
  <!-- <TCard :isError="error" :isEmpty="mtg.sets.length === 0" flushTitle> -->
  <TCard flushTitle :isEmpty="weatherSettings.locations.length === 0">
    <template #title>
      <h2 class="ml-2 text-2xl font-bold tracking-tight grow">Weather</h2>
    </template>
    <template #action>
      <!-- <TButton variant="link" @click="execute"> -->
      <TButton variant="link">
        Refresh
        <div class="w-7 h-7 p-1.5 text-white bg-orange-700 rounded-full">
          <RiRefreshLine class="w-4 h-4" />
        </div>
      </TButton>
    </template>
    <template #empty>
      <!-- https://duoicons.vercel.app/ -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="66"
        height="66"
        viewBox="0 0 24 24"
        class="opacity-65"
      >
        <path
          fill="#a8a29e99"
          d="m13.299 3.148 8.634 14.954a1.5 1.5 0 0 1-1.299 2.25H3.366a1.5 1.5 0 0 1-1.299-2.25l8.634-14.954c.577-1 2.02-1 2.598 0Z"
        />
        <path
          fill="#c2410c"
          d="M12 8a1 1 0 0 0-.993.883L11 9v4a1 1 0 0 0 1.993.117L13 13V9a1 1 0 0 0-1-1Zm0 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
        />
      </svg>
      No weather locations configured
    </template>
  </TCard>
  <!--  -->
</template>
