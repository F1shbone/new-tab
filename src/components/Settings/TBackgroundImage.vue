<script setup>
import { useBackgroundImage } from './useBackgroundImage';
import TFileInput from '../TFileInput.vue';

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
  background.value.active = e;
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
        class="p-[2px] rounded-xl mx-auto"
        :class="{
          'bg-gradient': background.active === image.name,
        }"
      >
        <button
          class="relative flex flex-col items-center w-full p-3 transition-colors bg-base-100 rounded-xl hover:bg-base-300"
          @click="onSelect(image.name)"
        >
          <div class="mx-auto mb-3 w-80">
            <div
              class="w-full h-full bg-center bg-no-repeat bg-contain max-h-40 min-h-[160px]"
              :style="`background-image: url(${image.dataURL})`"
            />
          </div>
          <span class="block text-center">{{ image.name }}</span>
        </button>
      </div>
    </li>
  </ul>
</template>

<style>
.bg-gradient {
  background: var(--gradient);
}
</style>
