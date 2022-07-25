<script setup>
import { ref, shallowRef, computed } from 'vue';
import TIcon from './TIcon.vue';

import TBackgroundImage from './Settings/TBackgroundImage.vue';
import TBookmarks from './Settings/TBookmarks.vue';
import TClock from './Settings/TClock.vue';

const active = ref(0);
const offset = computed(() => 48 * active.value);
const items = ref([
  {
    name: 'Background Image',
    icon: 'card-image',
    to: shallowRef(TBackgroundImage),
  },
  {
    name: 'Bookmarks',
    icon: 'bookmarks',
    to: shallowRef(TBookmarks),
  },
  {
    name: 'Clock',
    icon: 'clock',
    to: shallowRef(TClock),
  },
]);
</script>

<template>
  <div class="flex settings">
    <aside class="relative pl-6 menu basis-3/12">
      <!-- active indicator -->
      <div
        class="absolute top-0 left-0 w-1 h-12 transition-transform rounded-b-sm rounded-r-sm menu-indicator"
        :style="`transform: translateY(${offset}px)`"
      />
      <!-- items -->
      <button
        v-for="(item, i) in items"
        :key="i"
        class="flex items-center w-56 h-12 text-left cursor-pointer bg-inherit"
        :class="{
          active: active === i,
        }"
        @click="active = i"
      >
        <t-icon :icon="item.icon" class="text-lg menu-icon" />
        <span
          :data-text="item.name"
          class="relative ml-4 overflow-hidden font-semibold overflow-ellipsis menu-label"
          >{{ item.name }}</span
        >
      </button>
    </aside>
    <div class="py-3 ml-3 mr-6 overflow-y-auto basis-9/12 max-h-96">
      <component :is="items[active].to" />
    </div>
  </div>
</template>

<style scoped>
.settings {
  --orange: rgb(251, 84, 43);
  --magenta: rgb(202, 59, 178);
  --gradient: linear-gradient(
    93.83deg,
    var(--orange) -3.53%,
    var(--magenta) 110.11%
  );
  height: 25.5rem;
}
.menu-indicator {
  background: var(--gradient);
}
.active .menu-label {
  --active-opacity: 1;
  color: var(--magenta);
}
.menu-label::after {
  content: attr(data-text);
  @apply absolute;
  @apply top-0;
  @apply left-0;
  @apply right-0;
  @apply bottom-0;
  @apply block;
  @apply overflow-ellipsis;
  @apply inset-0;
  @apply overflow-hidden;
  -webkit-text-fill-color: transparent;
  opacity: var(--active-opacity, 0);
  background: var(--gradient);
  background-color: rgb(30, 32, 41);
  background-size: 100%;
  @apply bg-repeat;
  @apply bg-clip-text;
}
</style>
