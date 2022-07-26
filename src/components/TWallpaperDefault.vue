<script setup>
import { ref, onMounted } from 'vue';
import Trianglify from 'trianglify';
import colorbrewer from 'trianglify/colorbrewer';

const props = defineProps({
  width: {
    default: () => window.innerWidth,
  },
  height: {
    default: () => window.innerHeight,
  },
  cellSize: {
    default: () => 75,
  },
});

const canvas = Trianglify({
  cellSize: props.cellSize,
  width: props.width,
  height: props.height,
  seed: 112345,
  palette: [colorbrewer.YlOrRd],
  colorFunction: Trianglify.colorFunctions.sparkle(0.2),
}).toCanvas();

const el = ref();

onMounted(() => {
  el.value.appendChild(canvas);
});
</script>

<template>
  <div ref="el" />
</template>
