<script setup lang="ts">
import { computed, provide, ref, useTemplateRef } from 'vue'
import { useIntervalFn, onKeyStroke } from '@vueuse/core'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { RiAddLine } from '@remixicon/vue'

import TButton from '@/components/TButton.vue'
import TCard from '@/components/TCard.vue'
import TModal from '@/components/TModal.vue'
import TTimeInput from '@/components/TTimeInput.vue'
import TTimer, { type Timer } from '@/components/TTimer.vue'

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

const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)
const duration = computed(() => {
  return hours.value * 60 * 60 + minutes.value * 60 + seconds.value
})

function openModal() {
  activate()
  timerModal.value = true
}
function closeModal() {
  timerModal.value = false
  hours.value = 0
  minutes.value = 0
  seconds.value = 0
  deactivate()
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
  createTimer()
})

const timeForm = useTemplateRef('timeForm')
const { activate, deactivate } = useFocusTrap(timeForm, { immediate: true })
</script>

<template>
  <TCard flushTitle>
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
    <template v-for="(timer, i) in timers" :key="i">
      <TTimer :timer="timer" @elapse="timer.elapsed = true" @delete="timers.splice(i, 1)" />
    </template>
    <div v-if="timers.length === 0">
      <h4 class="ml-2 text-xl font-thin">No Timers</h4>
    </div>

    <TModal :isOpen="timerModal" size="sm" @close="closeModal()">
      <template #title>New Timer</template>
      <template #content>
        <div class="flex items-center justify-center" ref="timeForm">
          <TTimeInput v-model="hours" focus>{{
            hours > 1 || hours === 0 ? 'Hours' : 'Hour'
          }}</TTimeInput>
          <TTimeInput v-model="minutes">{{
            minutes > 1 || minutes === 0 ? 'Minutes' : 'Minute'
          }}</TTimeInput>
          <TTimeInput v-model="seconds">{{
            seconds > 1 || seconds === 0 ? 'Seconds' : 'Second'
          }}</TTimeInput>
        </div>
        <Transition
          enter-active-class="duration-300 ease-out"
          enter-from-class="transform opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="transform opacity-0"
        >
          <p v-if="duration === 0" class="mt-4 text-red-700">
            Can't create timer with a duration of <code>00:00:00</code>
          </p>
        </Transition>
      </template>
      <template #action-buttons>
        <TButton @click="createTimer()" :disabled="duration === 0">Create</TButton>
        <TButton variant="link" class="text-gray-400 hover:text-white" @click="closeModal()"
          >Cancel</TButton
        >
      </template>
    </TModal>
  </TCard>
</template>
