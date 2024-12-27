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
  <li
    :class="{
      'p-3': !flush,
    }"
  >
    <slot />
  </li>
</template>
