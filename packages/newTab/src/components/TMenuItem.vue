<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    to?: string
    active?: boolean
  }>(),
  {
    active: false,
  },
)
const emits = defineEmits(['click'])

const tag = computed(() => (props.to ? 'a' : 'button'))
const attrs = computed(() => {
  const attrs: {
    to?: string
  } = {}
  if (props.to) {
    attrs.to = props.to
  }

  return attrs
})
</script>

<template>
  <li class="flex flex-col flex-wrap items-stretch shrink-0">
    <component
      :is="tag"
      v-bind="attrs"
      class="flex items-center gap-2 px-4 rounded-md py-[0.625rem] transition-all duration-200 text-balance hover:bg-orange-700/25"
      :class="{
        'text-orange-500 bg-orange-700/15': active,
      }"
      @click="emits('click', $event)"
    >
      <slot />
    </component>
  </li>
</template>
