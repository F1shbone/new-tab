<script setup>
import { h, shallowRef, watchEffect } from 'vue';
import arrowClockwise from '../../node_modules/bootstrap-icons/icons/arrow-clockwise.svg?component';
import bookmarks from '../../node_modules/bootstrap-icons/icons/bookmarks.svg?component';
import cardImage from '../../node_modules/bootstrap-icons/icons/card-image.svg?component';
import chevronDown from '../../node_modules/bootstrap-icons/icons/chevron-down.svg?component';
import clock from '../../node_modules/bootstrap-icons/icons/clock.svg?component';
import sliders from '../../node_modules/bootstrap-icons/icons/sliders.svg?component';
import upload from '../../node_modules/bootstrap-icons/icons/upload.svg?component';

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
});
const svg = shallowRef('');

watchEffect(async () => {
  // const e = await import(
  //   `../../node_modules/bootstrap-icons/icons/${props.icon}.svg?component`
  // );
  // svg.value = e;

  if (props.icon === 'arrow-clockwise') svg.value = arrowClockwise;
  if (props.icon === 'bookmarks') svg.value = bookmarks;
  if (props.icon === 'card-image') svg.value = cardImage;
  if (props.icon === 'chevron-down') svg.value = chevronDown;
  if (props.icon === 'clock') svg.value = clock;
  if (props.icon === 'sliders') svg.value = sliders;
  if (props.icon === 'upload') svg.value = upload;
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
