<script setup>
import { h, useSlots } from 'vue';

const props = defineProps({
  static: {
    default: false,
    type: Boolean,
  },
  floating: {
    default: false,
    type: Boolean,
  },
});
const emits = defineEmits(['click']);

const slots = useSlots();

function render() {
  const btn = h(
    'button',
    {
      class: {
        'btn btn-sm btn-circle': true,
        'absolute right-2': !props.static,
        'top-2': !props.floating && !props.static,
        'btn-float': props.floating,
      },
      onClick: (e) => emits('click', e),
    },
    ['✕']
  );

  if (props.floating) {
    return h(
      'div',
      {
        class: {
          'relative overflow-hidden': true,
          floating: props.floating,
        },
      },
      [slots.default(), btn]
    );
  } else {
    return btn;
  }
}
</script>

<template>
  <render />
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
