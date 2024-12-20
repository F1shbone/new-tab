<script setup lang="ts">
import TEmpty from './TEmpty.vue'
import TLoader from './TLoader.vue'

defineProps<{
  isFetching?: boolean
  isError?: boolean
  isEmpty?: boolean
  flush?: boolean
}>()
</script>

<template>
  <div
    class="transition-all border border-gray-400 rounded-lg bg-gray-100/60 backdrop-blur-sm"
    :class="{
      'p-2': !flush,
    }"
  >
    <div v-if="$slots.title">
      <h2 class="mx-2 mt-2 tracking-tight text-orange-700 uppercase"><slot name="title" /></h2>
    </div>

    <div v-if="isFetching" class="flex justify-center">
      <TLoader />
    </div>
    <div v-else-if="isError" class="p-2">
      <slot name="error" />
    </div>
    <TEmpty v-else-if="isEmpty">
      <slot name="empty" />
    </TEmpty>
    <template v-else>
      <slot />
    </template>
  </div>
</template>
