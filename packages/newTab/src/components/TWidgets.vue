<script setup>
import { useWidgetState } from '../composables/useWidgetState';
import THackernews from './THackernews.vue';
import TWarhammer from './TWarhammer.vue';

const widgetState = useWidgetState();
function toggle(sender) {
  if (widgetState.value.active === sender) {
    widgetState.value.active = undefined;
  } else {
    widgetState.value.active = sender;
  }
}
</script>

<template>
  <div
    class="relative flex flex-col max-h-full overflow-hidden shadow-xl widgets card bg-base-100"
    :class="{
      'h-full': widgetState.active !== undefined,
    }"
  >
    <t-hackernews
      :is-expanded="widgetState.active === 'hackernews'"
      @toggle-expand="toggle('hackernews')"
    />
    <t-warhammer
      :is-expanded="widgetState.active === 'warhammer'"
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
