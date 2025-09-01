<script setup lang="ts">
import { ref, watch } from 'vue'
import { nanoid } from 'nanoid'

import TButton from '@/components/TButton.vue'
import TCheckbox from '@/components/TCheckbox.vue'
import TTextInput from '@/components/TTextInput.vue'
import TBookmark from '@/components/TBookmark.vue'
import TModal from '@/components/TModal.vue'

import { vFocus } from '@/directives/focus'

import { type Bookmark } from '@/composables/useBookmarks'
import { useRemoteFavicon } from '@/composables/useRemoteFavicon'

const emit = defineEmits<{
  (e: 'create', value: Bookmark): void
}>()
const visible = defineModel('visible', {
  type: Boolean,
  required: true,
})

const name = ref('')
const url = ref('')
const invert = ref(false)
const { favicon } = useRemoteFavicon(url)

watch(visible, (newVal) => {
  if (newVal === false) {
    name.value = ''
    url.value = ''
    invert.value = false
  }
})
</script>

<template>
  <TModal :isOpen="visible" size="sm" @close="visible = false">
    <template #title>Edit "{{ name }}"</template>
    <template #content>
      <div class="flex gap-4">
        <TBookmark element="div" :name="name" :href="url" :icon="favicon" :invert="invert" />
        <div class="grow">
          <TTextInput v-model="name" labelClass="w-24">Name:</TTextInput>
          <TTextInput v-model="url" labelClass="w-24" v-focus>URL:</TTextInput>
          <TCheckbox v-model="invert" reverse hover labelClass="w-24" flush class="py-2"
            >Invert:</TCheckbox
          >
        </div>
      </div>
    </template>
    <template #action-buttons>
      <TButton
        block
        @click="
          emit('create', {
            id: nanoid(),
            name,
            url,
            favicon,
            invert,
          })
        "
        >Save</TButton
      >
      <TButton block variant="link" @click="visible = false">Cancel</TButton>
    </template>
  </TModal>
</template>
