<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

import TIcon from './components/TIcon.vue';
import TClock from './components/TClock.vue';
import TBookmarks from './components/TBookmarks.vue';
import TWidgets from './components/TWidgets.vue';

const target = ref(null);
const customize = ref(false);

onClickOutside(target, () => {
  if (customize.value) {
    customize.value = false;
  }
});
</script>

<template>
  <main
    class="fixed top-0 bottom-0 left-0 right-0 p-3 grid grid-flow-row grid-cols-2 xl:grid-cols-4 grid-rows-[auto_1fr] bg-gray-200 dark:bg-gray-800"
  >
    <div class="h-full col-start-2 overflow-hidden text-right xl:col-start-4">
      <t-clock class="p-6 pr-14" />
    </div>
    <div
      class="h-full overflow-hidden p-2 grid grid-flow-col grid-cols-1 grid-rows-[1fr_auto]"
    >
      <t-bookmarks />
      <div class="mx-1">
        <button class="btn" @click="customize = !customize">
          <t-icon icon="sliders" class="mr-4 text-xl" /> Customize
        </button>
      </div>
    </div>
    <div class="h-full p-2 overflow-hidden xl:col-start-4">
      <t-widgets />
    </div>
  </main>
  <input type="checkbox" :checked="customize" class="modal-toggle" />
  <div class="modal">
    <div class="relative max-w-3xl modal-box" ref="target">
      <button
        class="absolute btn btn-sm btn-circle right-2 top-2"
        @click="customize = false"
      >
        ✕
      </button>
      <h3 class="text-lg font-bold">Customise Dashboard</h3>
      <p class="py-4">
        You've been selected for a chance to get one year of subscription to use
        Wikipedia for free!
      </p>
    </div>
  </div>
</template>
