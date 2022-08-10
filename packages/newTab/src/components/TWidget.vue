<script setup>
import { watch } from 'vue';
import TIcon from './TIcon.vue';
import TLoader from './TLoader.vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
  isExpanded: {
    type: Boolean,
    required: true,
  },
});
const emits = defineEmits(['refresh', 'toggleExpand']);

function toggleExpand() {
  emits('toggleExpand');
}

watch(
  () => props.isExpanded,
  (val) => {
    if (val) {
      emits('refresh');
    }
  },
  { immediate: true }
);
</script>

<template>
  <div
    class="relative transition-all"
    :class="{
      'is-expanded': isExpanded,
    }"
  >
    <div class="absolute right-[22px] top-[22px]">
      <button class="btn btn-sm btn-circle" @click="toggleExpand">
        <t-icon
          icon="chevron-down"
          :class="{
            'transition-all': true,
            'rotate-180': isExpanded,
          }"
        />
      </button>
      <button class="ml-2 btn btn-sm btn-circle" @click="$emit('refresh')">
        <t-icon icon="arrow-clockwise" />
      </button>
    </div>
    <h2
      class="px-8 py-6 text-orange-600 border-t border-b border-gray-600 card-title"
    >
      {{ $props.title }}
    </h2>
    <div
      class="relative flex flex-col overflow-y-auto widget-items"
      :class="{
        'max-h-0': !isExpanded,
        'h-full': isExpanded,
        'pointer-events-none overflow-hidden': isLoading,
      }"
    >
      <div
        :class="{
          'blur-md': isLoading,
        }"
      >
        <slot />
      </div>
      <t-loader v-show="isLoading" />
    </div>
  </div>
</template>

<style>
.widget-items div > * {
  @apply px-8;
  @apply py-3;
  @apply border-t;
  @apply border-gray-600;
}
</style>
