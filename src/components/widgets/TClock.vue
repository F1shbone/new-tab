<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDateFormat, useNow } from '@vueuse/core'

import { useClockStore } from '@/stores/clock'

const { timeFormat, dateFormat } = storeToRefs(useClockStore())

const now = useNow()
const currentTime = useDateFormat(now, timeFormat, { locales: 'de-DE' })
const currentDate = useDateFormat(now, dateFormat, { locales: 'de-DE' })
</script>

<template>
  <div class="sticky top-0">
    <h1 v-if="timeFormat" class="text-right text-white select-none text-7xl drop-shadow-xl">
      {{ currentTime }}
    </h1>
    <h1 v-if="dateFormat" class="text-right text-white select-none text-7xl drop-shadow-xl">
      <small class="block mt-1 text-3xl font-thin">{{ currentDate }}</small>
    </h1>
  </div>
</template>
