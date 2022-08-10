<script setup>
import { ref } from 'vue';

import TIcon from './components/TIcon.vue';
import TModal from './components/TModal.vue';

import TSettings from './components/TSettings.vue';

import TWallpaper from './components/TWallpaper.vue';
import TClock from './components/TClock.vue';
import TBookmarks from './components/TBookmarks.vue';
import TWidgets from './components/TWidgets.vue';

// import { useStorageLocal } from './composables/useStorage';

// const storage = useStorageLocal('cnt-background-script', {
//   test: 'lorem ipsum',
// });

// console.log(storage);
// storage.getItem('test').then(console.log);

const customizeModal = ref(false);
</script>

<template>
  <main
    class="fixed top-0 bottom-0 left-0 right-0 p-3 grid grid-flow-row grid-cols-2 xl:grid-cols-4 grid-rows-[auto_1fr] bg-gray-200 dark:bg-gray-800"
  >
    <t-wallpaper />

    <div class="h-full col-start-2 overflow-hidden text-right xl:col-start-4">
      <t-clock class="p-6 pr-14" />
    </div>
    <div
      class="h-full overflow-hidden p-2 grid grid-flow-col grid-cols-1 grid-rows-[1fr_auto]"
    >
      <t-bookmarks />
      <div class="mx-1">
        <button class="btn" @click="customizeModal = true">
          <t-icon icon="sliders" class="mr-4 text-xl" /> Customize
        </button>
      </div>
    </div>
    <div class="h-full p-2 overflow-hidden xl:col-start-4">
      <t-widgets />
    </div>
  </main>

  <t-modal :is-open="customizeModal" flush @close="customizeModal = false">
    <template #title>Customise Dashboard</template>
    <template #content><t-settings /></template>
  </t-modal>
</template>
