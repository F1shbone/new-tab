<script setup>
import { h, useSlots } from 'vue';

const props = defineProps({
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
        'absolute btn btn-sm btn-circle right-2': true,
        'top-2': !props.floating,
        'top-0 -translate-y-full btn-float': props.floating,
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
.floating:hover .btn-float {
  @apply translate-y-0;
  @apply top-2;
}
</style>
