<script setup lang="ts">
import { computed } from 'vue'

const model = defineModel<string | boolean>({
  required: true,
})

const props = withDefaults(
  defineProps<{
    name: string
    value?: string | boolean
  }>(),
  {
    value: true,
  },
)

const checked = computed(() => {
  if (typeof model.value === 'string') {
    return model.value === props.value
  } else {
    return model.value
  }
})
</script>

<template>
  <label class="flex items-center gap-3 px-3 py-2 cursor-pointer">
    <input
      type="radio"
      class="w-6 h-6 border border-gray-400 rounded-full appearance-none cursor-pointer t-radio bg-none checked:bg-orange-500 checked:border-orange-500 transition-color"
      :name="name"
      :value="value"
      :checked="checked"
      @input="model = value"
    />
    <span class="flex items-center justify-between p-1 cursor-pointer select-none">
      <slot />
    </span>
  </label>
</template>

<style>
.t-radio {
  --basebg: #fff;
  box-shadow:
    0 0 0 3px var(--basebg) inset,
    0 0 0 3px var(--basebg) inset,
    var(--tw-ring-offset-shadow),
    var(--tw-ring-shadow);
}
</style>
