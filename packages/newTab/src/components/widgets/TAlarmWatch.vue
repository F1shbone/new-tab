<script setup lang="ts">
import { provide, ref } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import { RiAddLine } from '@remixicon/vue'
import TCard from '@/components/TCard.vue'
import TTimer from '@/components/TTimer.vue'

const timersFns: Array<() => void> = []
useIntervalFn(() => {
  timersFns.forEach((e) => e())
}, 1000)

provide('register', (fn: () => void) => {
  timersFns.push(fn)
  return timersFns.length - 1
})
provide('unregister', (id: number) => {
  timersFns.splice(id, 1)
})

const timers = ref([])
</script>

<template>
  <TCard>
    <template #title>
      <div class="flex items-start justify-between">
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
    <div v-if="timers.length === 0">
      <h4 class="ml-2 text-xl font-thin">No Timers</h4>
    </div>
  </TCard>
</template>
