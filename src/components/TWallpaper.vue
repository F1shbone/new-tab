<script setup>
import { computed } from 'vue';
import { useBackgroundImage } from './Settings/useBackgroundImage';

const wallpaper = useBackgroundImage();
const dataURL = computed(() => {
  return wallpaper.value.images.find((e) => e.name === wallpaper.value.active)
    .dataURL;
});
</script>

<template>
  <div class="wallpaper__container">
    <div
      class="wallpaper__image"
      :style="`background-image: url(${dataURL})`"
    />
  </div>
</template>

<style scoped>
.wallpaper__container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}

.wallpaper__image {
  max-width: 100%;
  max-height: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
}
</style>
