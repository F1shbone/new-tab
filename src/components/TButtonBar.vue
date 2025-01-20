<script setup lang="ts">
withDefaults(
  defineProps<{
    direction?: 'row' | 'col'
  }>(),
  {
    direction: 'row',
  },
)
</script>

<template>
  <div
    class="inline-flex *:rounded-none *:border-orange-700/50"
    :class="{
      'flex-row first:*:rounded-l-md last:*:rounded-r-md divide-x *:grow': direction === 'row',
      'flex-col first:*:rounded-t-md last:*:rounded-b-md divide-y': direction === 'col',
    }"
  >
    <slot />
  </div>
</template>
