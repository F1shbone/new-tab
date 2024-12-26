<script setup lang="ts">
import { computed } from 'vue'
import { useDateFormat, useNow } from '@vueuse/core'

const now = useNow()
const currentTime = useDateFormat(now, 'HH:mm')
const currentDate = useDateFormat(now, 'DD.MM.YYYY')
const currentDay = computed(() => {
  const dayName = now.value.toLocaleDateString('de-DE', {
    weekday: 'long',
  })
  return `${dayName}, ${currentDate.value}`
})
</script>

<template>
  <h1 class="text-right text-white select-none text-7xl drop-shadow-xl">
    {{ currentTime }}
    <small class="block mt-1 text-3xl font-thin">{{ currentDay }}</small>
  </h1>
</template>
