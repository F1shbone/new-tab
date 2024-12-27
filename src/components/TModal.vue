<script setup lang="ts">
import { useTemplateRef, useId } from 'vue'
import { onKeyStroke, onClickOutside } from '@vueuse/core'
import { RiCloseLine } from '@remixicon/vue'

import TButton from './TButton.vue'

const props = withDefaults(
  defineProps<{
    isOpen: boolean
    flush?: boolean
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    flush: false,
    size: 'md',
  },
)
const emits = defineEmits(['close'])

const target = useTemplateRef('target')
const uid = useId()

onClickOutside(target, () => {
  if (props.isOpen) {
    emits('close')
  }
})
onKeyStroke('Escape', () => {
  if (props.isOpen) {
    emits('close')
  }
})
</script>

<template>
  <Teleport to="body">
    <div
      class="relative z-10"
      :aria-labelledby="`modal-title-${uid}`"
      role="dialog"
      aria-modal="true"
    >
      <Transition
        enter-active-class="duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="isOpen" class="fixed inset-0 z-0 transition-opacity bg-gray-800/75" />
      </Transition>

      <Transition name="modal">
        <div v-if="isOpen" class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            class="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0"
          >
            <div
              ref="target"
              class="relative overflow-hidden text-left transition-all transform shadow-xl modal-transition__inner sm:my-8 sm:w-full"
              :class="{
                'sm:max-w-4xl': size === 'lg',
                'sm:max-w-2xl': size === 'md',
                'sm:max-w-lg': size === 'sm',
              }"
            >
              <div
                class="relative overflow-hidden text-gray-300 bg-gray-800 rounded-t-lg"
                :class="{
                  'rounded-b-lg': !$slots['action-buttons'],
                  'px-4 pt-5 pb-4 sm:p-6 sm:pb-4': flush === false,
                }"
              >
                <TButton
                  square
                  size="sm"
                  variant="link"
                  class="absolute top-2 right-2"
                  @click="emits('close')"
                >
                  <RiCloseLine class="w-6 h-6" />
                </TButton>
                <h3
                  v-if="$slots.title"
                  class="text-base font-semibold text-white"
                  :id="`modal-title-${uid}`"
                >
                  <slot name="title" />
                </h3>
                <div
                  :class="{
                    'mt-2': $slots.title,
                  }"
                >
                  <slot name="content" />
                </div>
              </div>
              <div
                v-if="$slots['action-buttons']"
                class="p-3 bg-gray-900 rounded-b-lg sm:gap-4 sm:flex sm:flex-row-reverse"
              >
                <slot name="action-buttons" />
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<style>
.modal-enter-active .modal-transition__inner {
  @apply ease-out;
  @apply duration-300;
}
.modal-enter-from .modal-transition__inner {
  @apply opacity-0;
  @apply translate-y-4;
  @apply sm:translate-y-0;
  @apply sm:scale-95;
}
.modal-enter-to .modal-transition__inner {
  @apply opacity-100;
  @apply translate-y-0;
  @apply sm:scale-100;
}
.modal-leave-active .modal-transition__inner {
  @apply ease-in;
  @apply duration-200;
}
.modal-leave-from .modal-transition__inner {
  @apply opacity-100;
  @apply translate-y-0;
  @apply sm:scale-100;
}
.modal-leave-to .modal-transition__inner {
  @apply opacity-0;
  @apply translate-y-4;
  @apply sm:translate-y-0;
  @apply sm:scale-95;
}
</style>
