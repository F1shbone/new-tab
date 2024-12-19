<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useElementSize } from '@vueuse/core'

const props = defineProps<{
  active: string
  items: Array<{
    value: string
    text: string
  }>
}>()
const emits = defineEmits(['click'])

const container = useTemplateRef('container')
const { width } = useElementSize(container)

const activeIndex = computed(() => props.items.findIndex((e) => e.value === props.active))
</script>

<template>
  <div
    class="relative grid justify-center gap-4 p-1 mx-auto my-4 border border-gray-500 nav-button-cols w-96 justify-items-center rounded-xl"
    :style="{
      '--cols': items.length,
    }"
    ref="container"
  >
    <!-- Active Indicator -->
    <div
      class="absolute w-48 bg-gray-800 h-7 m-0.5 left-0 top-0 rounded-xl transition-transform"
      :style="{
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
