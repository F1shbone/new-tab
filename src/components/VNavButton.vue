<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useElementSize } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    active: string
    items: Array<{
      value: string
      text: string
    }>
    variant?: 'primary' | 'secondary'
  }>(),
  {
    variant: 'primary',
  },
)
const emits = defineEmits(['click'])

const container = useTemplateRef('container')
const { width } = useElementSize(container)

const activeIndex = computed(() => props.items.findIndex((e) => e.value === props.active))
</script>

<template>
  <div
    class="relative grid justify-center w-full gap-4 p-1 border border-gray-500 rounded-lg nav-button-cols justify-items-center"
    :style="{
      '--cols': items.length,
    }"
    ref="container"
  >
    <!-- Active Indicator -->
    <div
      class="absolute bg-gray-800 h-7 m-0.5 left-0 top-0 rounded-lg transition-transform"
      :class="{
        'bg-blue-600': variant === 'primary',
        'bg-gray-800': variant === 'secondary',
      }"
      :style="{
        width: `calc(${100 / items.length}% - 0.25rem)`,
        transform: `translateX(${activeIndex * (width / items.length)}px)`,
      }"
    />
    <!-- Items -->
    <button
      v-for="(item, id) in items"
      :key="id"
      class="z-40 w-full transition-colors rounded-lg hover:bg-gray-800/25"
      :class="{
        'text-white': id === activeIndex,
      }"
      @click="emits('click', item.value)"
    >
      {{ item.text }}
    </button>
  </div>
</template>

<style>
.nav-button-cols {
  grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
}
</style>
