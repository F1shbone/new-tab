<script setup lang="ts">
import { computed } from 'vue'
import { useBackgroundImage } from '../composables/useBackgroundImage'

import TWallpaperDefault from './TWallpaperDefault.vue'

const wallpaper = useBackgroundImage()
const dataURL = computed(() => {
  return wallpaper.value.images.find((e) => e.name === wallpaper.value.active)?.dataURL
})
</script>

<template>
  <div class="absolute top-0 bottom-0 left-0 right-0 -z-10">
    <div
      v-if="dataURL"
      class="h-screen max-w-full max-h-full bg-center bg-cover"
      :style="`background-image: url(${dataURL})`"
    />
    <t-wallpaper-default fullscreen v-else />

    <!-- <div class="absolute top-0 bottom-0 left-0 right-0 backdrop-blur-sm" /> -->
    <!-- <div class="absolute top-0 bottom-0 left-0 right-0 backdrop-blur-sm bg-white/15 dark:bg-black/20" /> -->
  </div>
</template>
