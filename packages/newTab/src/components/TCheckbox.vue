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
      type="checkbox"
      class="w-6 h-6 border border-gray-600 rounded-md appearance-none cursor-pointer v-checkbox bg-none checked:bg-orange-500 checked:border-orange-500 transition-color"
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
.v-checkbox:checked {
  --chkbg: #f97316;
  --chkfg: #1f2937;
  background-image: linear-gradient(-45deg, transparent 66%, var(--chkbg) 66.99%),
    linear-gradient(45deg, transparent 77%, var(--chkbg) 77.99%),
    linear-gradient(-45deg, var(--chkbg) 41%, transparent 41.99%),
    linear-gradient(
      45deg,
      var(--chkbg) 34%,
      var(--chkfg) 34.99%,
      var(--chkfg) 40%,
      transparent 40.99%
    ),
    linear-gradient(-45deg, var(--chkfg) 47%, var(--chkbg) 47.99%);
}
</style>
