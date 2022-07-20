<script setup>
import TIcon from './TIcon.vue';

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
  if (!props.isExpanded) {
    emits('refresh');
  }
  emits('toggleExpand');
}
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
    <h2 class="px-8 py-6 text-orange-600 card-title">
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
      <div
        v-show="isLoading"
        class="absolute top-0 bottom-0 left-0 right-0 transition-all bg-black/50"
      >
        <div class="spinner"></div>
      </div>
    </div>
  </div>
</template>

<style>
.widget-items div > a {
  @apply px-8;
  @apply py-3;
  @apply border-t;
  @apply border-gray-600;
}
@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
.spinner:before {
  content: '';
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2rem;
  height: 2rem;
  margin-top: -10px;
  margin-left: -10px;
  border-radius: 50%;
  border: 2px solid #f90;
  border-top-color: #000;
  animation: spinner 0.8s linear infinite;
}
</style>
