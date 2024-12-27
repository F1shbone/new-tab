<script setup lang="ts">
import { provide, ref } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import { RiAddLine } from '@remixicon/vue'

import TButton from '@/components/TButton.vue'
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
  <TCard flushTitle>
    <template #title>
      <h2 class="ml-2 text-base tracking-tight text-orange-700 uppercase grow">Alarmclock</h2>
    </template>
    <template #action>
      <TButton variant="link">
        New Timer
        <div class="w-7 h-7 p-1.5 text-white bg-orange-700 rounded-full">
          <RiAddLine class="w-4 h-4" />
        </div>
      </TButton>
    </template>
    <template v-for="(timer, i) in timers" :key="i">
      <TTimer :timer="timer" />
    </template>
    <div v-if="timers.length === 0">
      <h4 class="ml-2 text-xl font-thin">No Timers</h4>
    </div>
  </TCard>
</template>
