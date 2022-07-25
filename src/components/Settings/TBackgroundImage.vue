<script setup>
import { useBackgroundImage } from './useBackgroundImage';
import TFileInput from '../TFileInput.vue';
import TWallpaperDefault from '../TWallpaperDefault.vue';

const background = useBackgroundImage();

function onInput(e) {
  const index = background.value.images.findIndex((i) => i.name === e.name);
  if (index === -1) {
    background.value.images.push(e);
  } else {
    background.value.images[index] = e;
  }
}

function onSelect(e) {
  background.value.active = e.name;
}

function onRemove(e) {
  const index = background.value.images.findIndex((i) => i.name === e.name);

  if (index !== -1) {
    background.value.images.splice(index, 1);
  }
}
</script>

<template>
  <ul class="flex flex-wrap items-center">
    <li class="w-1/2 mb-4">
      <t-file-input accept="image/*" @input="onInput" />
    </li>
    <li
      v-for="image in background.images"
      :key="image.name"
      class="flex items-center w-1/2 mb-4"
    >
      <div
        class="p-[2px] rounded-xl mx-auto relative overflow-hidden item"
        :class="{
          'bg-gradient': background.active === image.name,
        }"
      >
        <button
          class="flex flex-col items-center w-full p-3 transition-colors bg-base-100 rounded-xl hover:bg-base-200"
          @click="onSelect(image)"
        >
          <div class="mx-auto mb-3 w-80">
            <div
              v-if="image.dataURL"
              class="w-full h-full bg-center bg-no-repeat bg-contain max-h-40 min-h-[160px]"
              :style="`background-image: url(${image.dataURL})`"
            />
            <t-wallpaper-default
              :width="320"
              :height="160"
              :cellSize="25"
              v-else
            />
          </div>
          <span class="block text-center">{{ image.name }}</span>
        </button>
        <button
          class="absolute top-0 -translate-y-full btn btn-sm btn-circle right-2"
          @click="onRemove(image)"
        >
          ✕
        </button>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.bg-gradient {
  background: var(--gradient);
}
.item:hover > .btn:last-child {
  @apply translate-y-0;
  @apply top-2;
}
</style>
