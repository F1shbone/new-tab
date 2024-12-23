<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'
/* @ts-expect-error vueuse_wrong_type */
import { useSound } from '@vueuse/sound'
import { RiPlayFill } from '@remixicon/vue'
import { RiPauseFill } from '@remixicon/vue'
import { RiDeleteBin2Fill } from '@remixicon/vue'
import buttonSfx from '../assets/alert.mp3'

const props = defineProps<{
  timer: number
}>()
const emits = defineEmits(['delete'])
const registerTimer = inject<(e: () => void) => number>('register')
const unregisterTimer = inject<(e: number) => void>('unregister')

const { play, stop } = useSound(buttonSfx, {
  volume: 0.15,
})

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
  ].join(':')
})

function onPlayPause() {
  paused.value = !paused.value
}
function timerFn() {
  if (!paused.value && countdown.value > 0) {
    countdown.value--
  }
  if (countdown.value === 0) {
    play()
    setTimeout(stop, 4000)
    unregisterTimer?.(timerId)
  }
}

let timerId = -1
onMounted(() => {
  if (registerTimer) {
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
      <h1
        class="text-3xl"
        style="
          font-family:
            Menlo,
            Consolas,
            Monaco,
            Liberation Mono,
            Lucida Console,
            monospace;
        "
      >
        {{ countdownDisplay }}
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
