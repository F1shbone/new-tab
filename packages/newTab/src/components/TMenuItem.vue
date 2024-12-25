<script setup lang="ts">
withDefaults(
  defineProps<{
    to?: string
    active?: boolean
  }>(),
  {
    to: '#',
    active: false,
  },
)
</script>

<template>
  <li class="flex flex-col flex-wrap items-stretch shrink-0">
    <a
      :href="to"
      class="flex items-center gap-2 px-4 rounded-md py-[0.625rem] transition-all duration-200 text-balance hover:bg-orange-700/25"
      :class="{
        'text-orange-500 bg-orange-700/15': active,
      }"
    >
      <slot />
    </a>
  </li>
</template>
