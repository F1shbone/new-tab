<script setup lang="ts">
withDefaults(
  defineProps<{
    block?: boolean
    variant?: 'primary' | 'secondary' | 'menu' | 'link'
    size?: 'sm' | 'md' | 'lg' | 'xl'
    square?: boolean
    round?: boolean
    disabled?: boolean
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
    class="flex items-center gap-2 transition-colors"
    :class="{
      'bg-orange-700 hover:bg-orange-800 text-white': variant === 'primary',
      'bg-gray-800 hover:bg-gray-900 text-white': variant === 'secondary',
      'bg-orange-700/20 hover:bg-orange-700/50 text-gray-800 hover:text-black': variant === 'menu',
      'hover:bg-orange-700/25': variant === 'link',
      'w-full justify-center': block,
      rounded: !round && (size === 'sm' || size === 'md'),
      'rounded-lg': !round && (size === 'lg' || size === 'xl' || variant === 'link'),
      'rounded-full': round,
      'px-1 py-0.5': size === 'sm' && !square && !round,
      'px-2 py-1': size === 'md' && !square && !round,
      'px-4 py-1.5 text-lg': size === 'lg' && !square && !round,
      'px-6 py-3 text-lg': size === 'xl' && !square && !round,
      'p-1': size === 'sm' && (square || round),
      'p-2': size === 'md' && (square || round),
      'p-1.5 text-lg': size === 'lg' && (square || round),
      'p-3 text-lg': size === 'xl' && (square || round),
      'opacity-50': disabled,
    }"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
