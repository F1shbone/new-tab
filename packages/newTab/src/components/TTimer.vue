<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, provide, ref } from 'vue'
import { RiPlayFill } from '@remixicon/vue'
import { RiPauseFill } from '@remixicon/vue'
import { RiDeleteBin2Fill } from '@remixicon/vue'

const props = defineProps<{
  timer: number
}>()
const emits = defineEmits(['delete'])
const registerTimer = inject<(e: () => void) => void>('register')
const unregisterTimer = inject<(e: () => void) => void>('unregister')

const paused = ref(false)
const countdown = ref(props.timer)
const countdownDisplay = computed(() => {
  const seconds = countdown.value
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = (seconds % 60).toFixed(0)

  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    secs.toString().padStart(2, '0'),
  ]
})

function onPlayPause() {
  paused.value = !paused.value
}
function timerFn() {
  if (!paused.value) {
    countdown.value--
  }
}

onMounted(() => {
  registerTimer?.(timerFn)
})
onBeforeUnmount(() => {
  unregisterTimer?.(timerFn)
})
</script>

<template>
  <div class="flex items-center gap-2 p-2 my-1">
    <div class="grow">
      <h1 class="text-3xl">
        <span class="inline-block w-10 text-center">{{ countdownDisplay[0] }}</span>
        <span>:</span>
        <span class="inline-block w-10 text-center">{{ countdownDisplay[1] }}</span>
        <span>:</span>
        <span class="inline-block w-10 text-center">{{ countdownDisplay[2] }}</span>
      </h1>
    </div>
    <button class="p-2 transition-colors rounded-full hover:bg-gray-500/30" @click="onPlayPause">
      <RiPlayFill v-if="paused" class="w-8 h-8" />
      <RiPauseFill v-else class="w-8 h-8" />
    </button>
    <button
      class="p-3 transition-colors rounded-full hover:bg-red-600/75 hover:text-white"
      @click="emits('delete')"
    >
      <RiDeleteBin2Fill class="w-6 h-6" />
    </button>
  </div>
</template>
