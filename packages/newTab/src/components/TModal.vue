<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

import TCloseButton from './TCloseButton.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  flush: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['close'])

const target = ref(null)

onClickOutside(target, () => {
  if (props.isOpen) {
    emits('close')
  }
})
</script>

<template>
  <input type="checkbox" :checked="isOpen" class="fixed w-0 h-0 opacity-0 appearance-none peer" />
  <div
    class="fixed top-0 bottom-0 left-0 right-0 z-50 flex justify-center invisible overflow-y-hidden transition-all duration-200 opacity-0 pointer-events-none bg-black/50 backdrop-blur-sm overscroll-contain peer-checked:opacity-100 peer-checked:pointer-events-auto peer-checked:visible"
  >
    <div
      class="absolute w-full max-w-5xl p-0 overflow-y-auto text-white transition-transform duration-200 -translate-y-1/2 bg-gray-800 rounded-lg shadow-xl overscroll-contain top-1/4 max-h-96"
      ref="target"
    >
      <TCloseButton @click="emits('close')" />
      <h3 class="p-6 pb-3 text-2xl font-bold">
        <slot name="title" />
      </h3>
      <div
        :class="{
          'px-6 pb-6': !flush,
        }"
      >
        <slot name="content" />
      </div>
    </div>
  </div>
</template>
