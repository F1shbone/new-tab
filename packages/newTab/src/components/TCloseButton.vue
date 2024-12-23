<script setup lang="ts">
import { h, useSlots } from 'vue'

const props = defineProps({
  static: {
    default: false,
    type: Boolean,
  },
  floating: {
    default: false,
    type: Boolean,
  },
})
const emits = defineEmits(['click'])
</script>

<template>
  <div v-if="floating" class="relative overflow-hidden" :class="{ floating }">
    <slot />

    <button
      class="w-8 h-8 p-0 text-sm rounded-full btn"
      :class="{
        'absolute right-2': !props.static,
        'top-2': !props.floating && !props.static,
        'btn-float': props.floating,
      }"
      @click="emits('click', $event)"
    >
      ✕
    </button>
  </div>
  <button
    v-else
    class="w-8 h-8 p-0 text-sm rounded-full btn"
    :class="{
      'absolute right-2': !props.static,
      'top-2': !props.floating && !props.static,
      'btn-float': props.floating,
    }"
    @click="emits('click', $event)"
  >
    ✕
  </button>
</template>

<style>
.btn-float {
  @apply top-0;
  @apply -translate-y-full;
  @apply animate-none !important;
}
.floating:hover .btn-float {
  @apply translate-y-0;
  @apply top-2;
}
</style>
