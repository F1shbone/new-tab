<script setup lang="ts">
withDefaults(
  defineProps<{
    name: string
    icon: string
    element?: string
    mode?: 'light' | 'dark'
    invert?: boolean
    noHover?: boolean
  }>(),
  {
    element: () => 'a',
    mode: 'light',
  },
)
</script>

<template>
  <component
    :is="element"
    class="flex flex-col shrink-0 items-center justify-start w-20 m-1 p-[5px] rounded-lg h-28 backdrop-blur-sm"
    :class="{
      'hover:bg-gray-100/60': mode === 'light' && !noHover,
      'hover:bg-gray-900/60': mode === 'dark' && !noHover,
    }"
  >
    <figure
      class="rounded-lg shadow-xl"
      :class="{
        'bg-gray-100/60': mode === 'light',
        'bg-gray-900/60': mode === 'dark',
      }"
    >
      <img
        :src="icon"
        class="p-4 w-[70px] h-[70px]"
        :class="{
          invert,
        }"
      />
    </figure>
    <p
      class="max-w-full pt-4 pb-2 overflow-hidden text-xs text-ellipsis whitespace-nowrap text-shadow"
      :class="{
        'text-black': mode === 'light',
        'text-white': mode === 'dark',
      }"
    >
      {{ name }}
    </p>
  </component>
</template>
