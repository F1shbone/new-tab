<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  element: {
    type: String,
    default: () => 'a',
  },
})
</script>

<template>
  <!-- <render /> -->
  <component
    :is="element"
    class="flex flex-col shrink-0 items-center justify-start w-20 m-1 p-[5px] rounded-lg h-28 hover:bg-gray-100/60 backdrop-blur-sm"
  >
    <figure class="rounded-lg shadow-xl bg-gray-100/60">
      <img :src="icon" class="p-4 w-[70px] h-[70px]" />
    </figure>
    <p
      class="max-w-full pt-4 pb-2 overflow-hidden text-xs text-black text-ellipsis whitespace-nowrap text-shadow"
    >
      {{ name }}
    </p>
  </component>
</template>
