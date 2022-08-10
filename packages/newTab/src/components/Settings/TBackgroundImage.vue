<script setup>
import { h } from 'vue';
import { useBackgroundImage } from '../../composables/useBackgroundImage';

import TCloseButton from '../TCloseButton.vue';
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

    if (e.name === background.value.active) {
      background.value.active = 'Default';
    }
  }
}

function renderThumbnail({ image }) {
  return h(
    'button',
    {
      class:
        'flex flex-col items-center w-full p-3 transition-colors bg-base-100 rounded-xl hover:bg-base-200',
      onClick: () => onSelect(image),
    },
    [
      h('div', { class: 'mx-auto mb-3 w-80' }, [
        image.dataURL
          ? h('div', {
              class:
                'w-full h-full bg-center bg-no-repeat bg-contain max-h-40 min-h-[160px]',
              style: `background-image: url(${image.dataURL})`,
            })
          : h(TWallpaperDefault, {
              width: 320,
              height: 160,
              cellSize: 25,
            }),
      ]),
      h('span', { class: 'block text-center' }, image.name),
    ]
  );
}
</script>

<template>
  <div class="ml-3 mr-6">
    <t-file-input
      accept="image/*"
      @input="onInput"
      class="flex justify-center w-1/2 mb-3 text-white"
    />

    <hr class="mb-6 border border-gray-500" />

    <ul class="flex flex-wrap items-center">
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
          <t-close-button
            v-if="image.dataURL"
            floating
            @click="onRemove(image)"
          >
            <template #default>
              <render-thumbnail :image="image" />
            </template>
          </t-close-button>

          <render-thumbnail v-else :image="image" />
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.bg-gradient {
  background: var(--gradient);
}
</style>
