<script setup lang="ts">
import { RiChat1Line, RiLink } from '@remixicon/vue'
import { ref } from 'vue'

const width = ref(Math.random() * 151 + 250)
</script>

<template>
  <div role="status" class="block p-2 my-2 transition-colors animate-pulse">
    <div class="flex items-start gap-4">
      <div class="grow">
        <div class="h-4 mb-3 bg-gray-700 rounded-full" :style="`width: ${width}px`" />
        <h5 class="flex items-center gap-2 my-1 text-xs">
          <RiLink class="w-4 h-4 shrink-0" />
          <div class="h-2 bg-gray-700 rounded-full grow" />
        </h5>
        <div class="h-2 bg-gray-700 rounded-full mb-2.5 w-60" />
      </div>
      <div class="flex flex-col gap-2 text-center shrink text-black/75">
        <RiChat1Line class="w-6 h-6 text-orange-700" />
        <div class="w-6 h-4 bg-gray-700 rounded-full" />
      </div>
    </div>
    <span class="sr-only">Loading...</span>
  </div>
</template>
