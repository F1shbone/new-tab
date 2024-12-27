<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'
/* @ts-expect-error vueuse_wrong_type */
import { useSound } from '@vueuse/sound'
import { RiPlayFill } from '@remixicon/vue'
import { RiPauseFill } from '@remixicon/vue'
import { RiDeleteBin2Fill } from '@remixicon/vue'
import buttonSfx from '../assets/alert.mp3'

export type Timer = {
  duration: number
  elapsed: boolean
}

const props = defineProps<{
  timer: Timer
}>()
const emits = defineEmits(['delete', 'elapse'])
const registerTimer = inject<(e: () => void) => number>('register')
const unregisterTimer = inject<(e: number) => void>('unregister')

const { play, stop } = useSound(buttonSfx, {
  volume: 0.15,
})

const paused = ref(false)
const countdown = ref(props.timer.duration)
const countdownDisplay = computed(() => {
  const seconds = countdown.value
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = (seconds % 60).toFixed(0)

  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    secs.toString().padStart(2, '0'),
  ].join(':')
})

function onPlayPause() {
  if (!props.timer.elapsed) {
    paused.value = !paused.value
  }
}
function timerFn() {
  if (!paused.value && countdown.value > 0) {
    countdown.value--
  }
  if (countdown.value === 0) {
    emits('elapse')
    play()
    setTimeout(stop, 4000)
    unregisterTimer?.(timerId)
  }
}

let timerId = -1
onMounted(() => {
  if (registerTimer && !props.timer.elapsed) {
    timerId = registerTimer(timerFn)
  }
})
onBeforeUnmount(() => {
  unregisterTimer?.(timerId)
})
</script>

<template>
  <div class="flex items-center gap-2 p-2 my-1">
    <div class="grow">
      <h1 class="font-mono text-2xl">
        <!-- style="
          font-family:
            Menlo,
            Consolas,
            Monaco,
            Liberation Mono,
            Lucida Console,
            monospace;
        " -->
        {{ countdownDisplay }}
      </h1>
    </div>
    <button
      class="p-1.5 w-8 h-8 transition-colors rounded-full hover:bg-orange-700/25"
      @click="onPlayPause"
    >
      <RiPlayFill v-if="paused" class="w-full h-full" />
      <RiPauseFill v-else class="w-full h-full" />
    </button>
    <button
      class="p-1.5 w-8 h-8 transition-colors rounded-full hover:bg-red-600 hover:text-white"
      @click="emits('delete')"
    >
      <RiDeleteBin2Fill class="w-full h-full" />
    </button>
  </div>
</template>
