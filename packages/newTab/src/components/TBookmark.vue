<script setup>
import { h, useSlots, useAttrs, mergeProps } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  element: {
    type: String,
    default: () => 'a',
  },
});
const slots = useSlots();
const attrs = useAttrs();

function render() {
  if (!slots.icon) {
    throw new Error('Slot "icon" is required for this component');
  }

  const icon = slots.icon();
  icon[0].props.class = 'p-4 w-[70px] h-[70px]';

  const children = [
    h('figure', { class: 'rounded-lg shadow-xl bg-base-100' }, [icon]),
    h(
      'p',
      {
        class:
          'max-w-full pt-4 pb-2 overflow-hidden text-xs text-white text-ellipsis whitespace-nowrap text-shadow',
      },
      props.name
    ),
  ];

  return h(
    props.element,
    mergeProps(
      {
        class:
          'flex flex-col shrink-0 items-center justify-start w-20 m-1 p-[5px] rounded-lg h-28 hover:bg-base-300/75',
      },
      attrs
    ),
    children
  );
}
</script>

<template>
  <render />
</template>
