<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

import TCloseButton from './TCloseButton.vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  flush: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(['close']);

const target = ref(null);

onClickOutside(target, () => {
  if (props.isOpen) {
    emits('close');
  }
});
</script>

<template>
  <input type="checkbox" :checked="isOpen" class="modal-toggle" />
  <div class="modal">
    <div class="relative max-w-5xl p-0 modal-box" ref="target">
      <t-close-button @click="emits('close')" />
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
