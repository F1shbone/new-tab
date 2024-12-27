<script setup lang="ts">
const model = defineModel<string>({
  required: true,
})

defineProps<{
  hideLabel?: boolean
}>()
</script>

<template>
  <label class="flex items-center gap-3 px-3 py-2 cursor-pointer">
    <span
      v-if="!hideLabel"
      class="flex items-center justify-between p-1 cursor-pointer select-none"
    >
      <slot />
    </span>
    <input
      type="text"
      class="w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md"
      v-model="model"
    />
  </label>
</template>
