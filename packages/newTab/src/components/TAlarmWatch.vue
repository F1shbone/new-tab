<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core'
import { RiAddLine } from '@remixicon/vue'
import TCard from './TCard.vue'
import TTimer from './TTimer.vue'
import { provide, ref } from 'vue'

const timersFns: Array<() => void> = []
useIntervalFn(() => {
  timersFns.forEach((e) => e())
}, 1000)

provide('register', (fn: () => void) => {
  timersFns.push(fn)
})
provide('unregister', (fn: () => void) => {
  timersFns.filter((e) => e === fn)
})

const timers = ref([60 * 15, 60 * 30, 60 * 45, 60 * 60])
</script>

<template>
  <TCard>
    <template #title>
      <div class="flex items-center justify-between">
        <span>AlarmWatch</span>
        <button
          class="flex items-center gap-1 p-2 mb-1 text-lg text-black rounded-lg bg-gray-500/15 hover:bg-gray-500/30"
        >
          <RiAddLine />
          New Timer
        </button>
      </div>
    </template>
    <template v-for="(timer, i) in timers" :key="i">
      <TTimer :timer="timer" />
    </template>
  </TCard>
</template>
