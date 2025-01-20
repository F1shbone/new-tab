<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <aside class="z-0 flex flex-col w-64 pb-2 text-gray-900 bg-gray-200 shadow-none" tabindex="-1">
    <div v-if="title" class="flex items-center justify-between p-6">
      <div class="flex items-center gap-3">
        <h3 class="text-xl font-semibold drawer-title">{{ title }}</h3>
      </div>
    </div>
    <div class="px-2 overflow-x-hidden overflow-y-auto text-base grow">
      <ul class="flex flex-col flex-wrap gap-0.5 rounded-lg">
        <slot />
      </ul>
    </div>
  </aside>
</template>
