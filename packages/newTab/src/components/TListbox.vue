<script setup lang="ts">
withDefaults(
  defineProps<{
    flush?: boolean
  }>(),
  {
    flush: false,
  },
)
</script>

<template>
  <h3
    v-if="$slots.title"
    class="mb-1 ml-3 font-thin tracking-tight text-gray-400 uppercase v-listbox-title"
  >
    <slot name="title" />
  </h3>
  <ul
    class="v-listbox border-base-content/25 divide-base-content/25 divide-y divide-gray-600 rounded-md border border-gray-600 first:*:rounded-t-md last:*:rounded-b-md text-sm"
  >
    <slot />
  </ul>
</template>

<style>
.v-listbox + .v-listbox-title {
  @apply mt-8;
}
.v-listbox + .v-listbox {
  @apply mt-2;
}
</style>
