<script setup lang="ts">
import TEmpty from './TEmpty.vue'
import TLoader from './TLoader.vue'

defineProps<{
  isFetching?: boolean
  isError?: boolean
  isEmpty?: boolean
  flush?: boolean
  flushTitle?: boolean
}>()
</script>

<template>
  <div
    class="transition-all border border-gray-400 rounded-lg bg-gray-100/60 backdrop-blur-sm"
    :class="{
      'p-2': !flush,
    }"
  >
    <div
      v-if="$slots.title || $slots.action"
      class="flex items-center pb-2 t-card-title"
      :class="{
        'pt-2 px-2': !flushTitle,
      }"
    >
      <slot name="title" />
      <slot name="action" />
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

<style>
.t-card-title {
  font-size: 16px;
}
</style>
