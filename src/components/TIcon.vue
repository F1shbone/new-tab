<script setup>
import { h, ref, watchEffect } from 'vue';

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
});
const svg = ref('');

watchEffect(async () => {
  const e = await import(`../../node_modules/bootstrap-icons/icons/${props.icon}.svg?component`);
  svg.value = e;
});

const render = () => {
  if (svg.value) {
    const icon = h(svg.value, {
      width: '1em',
      height: '1em',
      viewBox: '0 0 16 16',
    });
    if (icon.props.class?.indexOf('inline-block') === -1) {
      icon.props.class += ' inline-block';
    }

    return icon;
  } else {
    return;
  }
};
</script>

<template>
  <render />
</template>
