<script setup lang="ts">
import { ref } from 'vue'
import { nanoid } from 'nanoid'

import { vFocus } from '@/directives/focus'

import TButton from '@/components/TButton.vue'
import TTextInput from '@/components/TTextInput.vue'
import TModal from '@/components/TModal.vue'

import type { BookmarkGroup } from '@/composables/useBookmarks'

const visible = defineModel('visible', {
  type: Boolean,
  required: true,
})
const emit = defineEmits<{
  (e: 'createGroup', val: BookmarkGroup): void
}>()

const name = ref('')

function createGroup() {
  emit('createGroup', {
    id: nanoid(),
    name: name.value,
    showName: false,
    bookmarks: [],
  })
  visible.value = false
}
</script>

<template>
  <TModal :isOpen="visible" size="sm" @close="visible = false">
    <template #title>Add new Group</template>
    <template #content>
      <TTextInput v-model="name" labelClass="w-24" v-focus>Name:</TTextInput>
      <Transition>
        <span v-if="name === ''" class="text-sm text-red-500">Name cannot be empty</span>
      </Transition>
    </template>
    <template #action-buttons>
      <TButton block :disabled="name === ''" @click="createGroup()">Save</TButton>
      <TButton block variant="link" @click="visible = false">Cancel</TButton>
    </template>
  </TModal>
</template>
