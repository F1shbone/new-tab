<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { useIntervalFn, onKeyStroke } from '@vueuse/core'
import { RiAddLine } from '@remixicon/vue'

import TButton from '@/components/TButton.vue'
import TCard from '@/components/TCard.vue'
import TModal from '@/components/TModal.vue'
import TTimer, { type Timer } from '@/components/TTimer.vue'
import TTimerInput from '@/components/TTimerInput.vue'

import { useAlarmClockStore } from '@/stores/alarmclock'

const alarmClockSettings = useAlarmClockStore()

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

const timerModal = ref(false)
const timers = ref<Array<Timer>>([])

const hours = ref(alarmClockSettings.hours)
const minutes = ref(alarmClockSettings.minutes)
const seconds = ref(alarmClockSettings.seconds)

const duration = computed(() => {
  return hours.value * 60 * 60 + minutes.value * 60 + seconds.value
})

function openModal() {
  timerModal.value = true
}
function closeModal() {
  timerModal.value = false
  hours.value = alarmClockSettings.hours
  minutes.value = alarmClockSettings.minutes
  seconds.value = alarmClockSettings.seconds
}

function createTimer() {
  if (duration.value > 0) {
    timers.value.push({
      duration: duration.value,
      elapsed: false,
    })
    closeModal()
  }
}

onKeyStroke('Enter', () => {
  if (timerModal.value) {
    createTimer()
  }
})
</script>

<template>
  <TCard flushTitle :isEmpty="timers.length === 0">
    <template #title>
      <h2 class="ml-2 text-base tracking-tight text-orange-700 uppercase grow">Alarmclock</h2>
    </template>
    <template #action>
      <TButton variant="link" @click="openModal">
        New Timer
        <div class="w-7 h-7 p-1.5 text-white bg-orange-700 rounded-full">
          <RiAddLine class="w-4 h-4" />
        </div>
      </TButton>
    </template>
    <template #empty>No Timers</template>

    <TTimer
      v-for="(timer, i) in timers"
      :key="i"
      :timer="timer"
      @elapse="timer.elapsed = true"
      @delete="timers.splice(i, 1)"
    />
  </TCard>

  <TModal :isOpen="timerModal" size="sm" @close="closeModal">
    <template #title>New Timer</template>
    <template #content>
      <TTimerInput v-model:hours="hours" v-model:minutes="minutes" v-model:seconds="seconds" />
      <Transition
        enter-active-class="duration-300 ease-out"
        enter-from-class="transform opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="transform opacity-0"
      >
        <p v-if="duration === 0" class="mt-4 text-center text-red-700">
          Can't create timer with a duration of <code>00:00:00</code>
        </p>
      </Transition>
    </template>
    <template #action-buttons>
      <TButton @click="createTimer" :disabled="duration === 0">Create</TButton>
      <TButton variant="link" class="text-gray-400 hover:text-white" @click="closeModal"
        >Cancel</TButton
      >
    </template>
  </TModal>
</template>
