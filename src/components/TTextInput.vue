<script setup lang="ts">
const model = defineModel<string>({
  required: true,
})

defineProps<{
  hideLabel?: boolean
  labelClass?: string
}>()
</script>

<template>
  <label class="flex items-center gap-3 py-2 cursor-pointer">
    <span
      v-if="!hideLabel"
      class="flex items-center justify-between p-1 cursor-pointer select-none"
      :class="labelClass"
    >
      <slot />
    </span>
    <input
      type="text"
      class="flex-grow px-3 py-2 bg-transparent border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
      v-model="model"
    />
  </label>
</template>
