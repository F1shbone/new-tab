<script setup>
import { ref } from 'vue';
import THackernews from './THackernews.vue';
import TWarhammer from './TWarhammer.vue';

const isOpen = ref('hackernews');
function toggle(sender) {
  if (isOpen.value === sender) {
    isOpen.value = undefined;
  } else {
    isOpen.value = sender;
  }
}
</script>

<template>
  <div
    class="relative flex flex-col max-h-full overflow-hidden shadow-xl widgets card bg-base-100"
    :class="{
      'h-full': isOpen !== undefined,
    }"
  >
    <t-hackernews
      :is-expanded="isOpen === 'hackernews'"
      @toggle-expand="toggle('hackernews')"
    />
    <t-warhammer
      :is-expanded="isOpen === 'warhammer'"
      @toggle-expand="toggle('warhammer')"
    />
  </div>
</template>

<style>
.widgets > div {
  overflow: hidden;
}
.widgets > div:first-child h2 {
  border-top: 0;
}
.widgets > div:last-child h2 {
  border-bottom: 0;
}
.widgets > div.is-expanded {
  flex: 1;
}
</style>
