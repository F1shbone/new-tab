<script setup lang="ts">
withDefaults(
  defineProps<{
    flush?: boolean
    direction?: 'row' | 'col'
  }>(),
  {
    flush: false,
    direction: 'col',
  },
)
</script>

<template>
  <h3
    v-if="$slots.title"
    class="mb-1 ml-3 font-thin tracking-tight text-gray-600 uppercase v-listbox-title"
  >
    <slot name="title" />
  </h3>
  <ul
    class="flex text-sm border border-gray-400 divide-gray-400 rounded-md v-listbox border-base-content/25 divide-base-content/25"
    :class="{
      'flex-row first:*:rounded-l-md last:*:rounded-r-md divide-x *:grow': direction === 'row',
      'flex-col first:*:rounded-t-md last:*:rounded-b-md divide-y': direction === 'col',
    }"
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
