<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import Trianglify from 'trianglify';
import colorbrewer from 'trianglify/colorbrewer';

const props = defineProps({
  width: {},
  height: {},
  fullscreen: {
    default: false,
    type: Boolean,
  },
  cellSize: {
    default: () => 75,
  },
});

function generateWallpaper() {
  return Trianglify({
    cellSize: props.cellSize,
    width: props.fullscreen ? window.innerWidth : props.width,
    height: props.fullscreen ? window.innerHeight : props.height,
    seed: 112345,
    palette: [colorbrewer.YlOrRd],
    colorFunction: Trianglify.colorFunctions.sparkle(0.2),
  });
}

const el = ref();
const onResize = useDebounceFn(() => {
  el.value.innerHTML = '';
  el.value.appendChild(generateWallpaper().toCanvas());
});
const resizeOb = new ResizeObserver(onResize);

onMounted(() => {
  el.value.appendChild(generateWallpaper().toCanvas());
  if (props.fullscreen) {
    resizeOb.observe(el.value);
  }
});
onBeforeUnmount(() => {
  if (props.fullscreen) {
    resizeOb.disconnect();
  }
});
</script>

<template>
  <div class="w-full h-full" ref="el" />
</template>
