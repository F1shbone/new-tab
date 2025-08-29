<script setup lang="ts">
import { useFocus } from '@vueuse/core'
import { computed, useTemplateRef } from 'vue'

const model = defineModel<number>({
  required: true,
})
const props = defineProps<{
  focus?: boolean
}>()

const ones = computed<number>({
  get() {
    const index = model.value < 10 ? 0 : 1
    return +(`${model.value}`.split('')[index] ?? 0)
  },
  set(val) {
    if (model.value < 10) {
      model.value = val
    } else {
      model.value = +`${`${model.value}`.split('')[0]}${val}`
    }
  },
})
const tens = computed<number>({
  get() {
    if (model.value < 10) return 0
    return +`${model.value}`.split('')[0]
  },
  set(val) {
    const index = model.value < 10 ? 0 : 1
    model.value = +`${val}${`${model.value}`.split('')[index]}`
  },
})

function checkNumber(e: Event, type: 'ones' | 'tens') {
  if (!e.target) return

  const input = (e as InputEvent).data ?? '0'
  const current = type === 'tens' ? tens : ones

  if (!/[0-9]/g.test(input)) {
    e.preventDefault()
    ;(e.target as HTMLInputElement).value = `${current.value}`
    return false
  } else {
    current.value = +input
  }
}

const tensEl = useTemplateRef('tensEl')
if (props.focus) {
  useFocus(tensEl, { initialValue: true })
}
</script>

<template>
  <label class="flex flex-col items-center gap-3 px-3 cursor-pointer">
    <div class="flex w-24 gap-3">
      <input
        ref="tensEl"
        type="text"
        class="min-w-0 px-3 py-2 font-mono text-center bg-transparent border border-gray-400 rounded-md outline-none grow focus:border-orange-500 focus:ring-2 focus:ring-orange-700"
        :value="tens"
        @input="checkNumber($event, 'tens')"
      />
      <input
        type="text"
        class="min-w-0 px-3 py-2 font-mono text-center bg-transparent border border-gray-400 rounded-md outline-none grow focus:border-orange-500 focus:ring-2 focus:ring-orange-700"
        :value="ones"
        @input="checkNumber($event, 'ones')"
      />
    </div>
    <span class="flex items-center justify-between cursor-pointer select-none">
      <slot />
    </span>
  </label>
</template>
