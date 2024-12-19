<script setup lang="ts" generic="T">
import { RiRefreshLine } from '@remixicon/vue'

defineProps<{
  items: {
    [date: string]: Array<T>
  }
}>()

const emits = defineEmits(['refresh'])
</script>

<template>
  <div class="relative h-full overflow-x-scroll">
    <button
      class="absolute top-0 z-40 flex items-center justify-center gap-2 px-3 py-1 text-white transition-all bg-gray-800 rounded-lg left-2 hover:bg-gray-900"
      @click="emits('refresh')"
    >
      Refresh
      <RiRefreshLine class="w-4 h-4" />
    </button>

    <ol
      v-for="(dateItems, date, i) in items"
      :key="date"
      class="relative mr-4 border-gray-700 first:mt-4 border-e"
    >
      <li
        :class="{
          'pb-2': i !== Object.keys(items ?? {}).length - 1,
          'mx-4': true,
        }"
      >
        <div class="absolute w-3 h-3 rounded-full mt-1.5 -end-1.5 bg-orange-700" />
        <time class="block pt-1 font-normal leading-none text-right text-orange-700">{{
          date
        }}</time>
        <template v-for="(item, j) in dateItems" :key="j">
          <slot :item="item" />
        </template>
      </li>
    </ol>
  </div>
</template>
