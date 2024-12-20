<script setup lang="ts">
withDefaults(
  defineProps<{
    block?: boolean
    variant?: 'primary' | 'secondary' | 'link'
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    block: false,
    variant: 'primary',
    size: 'md',
  },
)
</script>

<template>
  <button
    class="flex items-center gap-2 transition-colors rounded-lg"
    :class="{
      'bg-orange-700 text-white hover:bg-orange-800': variant === 'primary',
      'bg-gray-800 text-white hover:bg-gray-900': variant === 'secondary',
      'hover:bg-orange-700/25': variant === 'link',
      'block justify-center': block,
      'px-1 py-0.5': size === 'sm',
      'px-2 py-1': size === 'md',
      'px-6 py-3 text-lg': size === 'lg',
    }"
  >
    <slot />
  </button>
</template>
