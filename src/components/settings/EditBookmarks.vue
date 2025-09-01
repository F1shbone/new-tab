<script setup lang="ts">
import { ref, toRaw, watch } from 'vue'

import TButton from '@/components/TButton.vue'
import TCheckbox from '@/components/TCheckbox.vue'
import TTextInput from '@/components/TTextInput.vue'
import TBookmark from '@/components/TBookmark.vue'
import TModal from '@/components/TModal.vue'

import { vFocus } from '@/directives/focus'

import { type Bookmark } from '@/composables/useBookmarks'

const props = defineProps<{
  bookmark: Bookmark
}>()
const emit = defineEmits<{
  (e: 'update', value: Bookmark): void
}>()
const visible = defineModel('visible', {
  type: Boolean,
  required: true,
})

const bookmarkCopy = ref(structuredClone(toRaw(props.bookmark)))
watch(
  () => props.bookmark,
  (newVal) => {
    bookmarkCopy.value = structuredClone(toRaw(newVal))
  },
  { deep: true },
)
</script>

<template>
  <TModal :isOpen="visible" size="sm" @close="visible = false">
    <template #title>Edit "{{ bookmark.name }}"</template>
    <template #content>
      <div class="flex gap-4">
        <TBookmark
          element="div"
          :name="bookmarkCopy.name"
          :href="bookmarkCopy.url"
          :icon="bookmarkCopy.favicon"
          :invert="bookmarkCopy.invert"
        />
        <div class="grow">
          <TTextInput v-model="bookmarkCopy.name" labelClass="w-24" v-focus>Name:</TTextInput>
          <TTextInput v-model="bookmarkCopy.url" labelClass="w-24">URL:</TTextInput>
          <TCheckbox
            v-model="bookmarkCopy.invert"
            reverse
            hover
            labelClass="w-24"
            flush
            class="py-2"
            >Invert:</TCheckbox
          >
        </div>
      </div>
    </template>
    <template #action-buttons>
      <TButton block @click="emit('update', bookmarkCopy)">Save</TButton>
      <TButton block variant="link" @click="visible = false">Cancel</TButton>
    </template>
  </TModal>
</template>
