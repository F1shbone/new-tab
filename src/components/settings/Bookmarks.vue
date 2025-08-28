<script setup lang="ts">
import { reactive, ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import {
  RiLayoutGridFill,
  RiBookmarkFill,
  RiDragMove2Line,
  RiPencilFill,
  RiDeleteBin7Fill,
} from '@remixicon/vue'

import TButton from '@/components/TButton.vue'
import TCheckbox from '@/components/TCheckbox.vue'
import TTextInput from '@/components/TTextInput.vue'
import TBookmark from '@/components/TBookmark.vue'
import TModal from '@/components/TModal.vue'

import { type Bookmark, useBookmarks } from '@/composables/useBookmarks'

const { bookmarks } = useBookmarks()

const editModal = ref<{ visible: boolean; group?: string; bookmark?: Bookmark }>({
  visible: false,
})

function clone<T>(obj: T) {
  return JSON.parse(JSON.stringify(obj))
}

function overwriteBookmark(group: string, newBookmark: Bookmark) {
  const groupIndex = bookmarks.value.groups.findIndex((g) => g.name === group)
  const index = bookmarks.value.groups[groupIndex].bookmarks.findIndex(
    (b) => b.id === newBookmark.id,
  )

  bookmarks.value.groups[groupIndex].bookmarks[index] = newBookmark
  editModal.value = { visible: false }
}
</script>

<template>
  <h1 class="mb-8 text-4xl font-bold tracking-tight">Bookmarks</h1>

  <div v-for="(group, i) in bookmarks.groups" :key="i" class="py-4 mb-4 border-b border-gray-300">
    <div class="flex items-center gap-2 mb-2">
      <h4 class="font-thin tracking-tight text-gray-600 uppercase">{{ group.name }}</h4>
      <TButton variant="link" square size="sm"><RiPencilFill /></TButton>
      <TButton variant="link" square size="sm" class="hover:text-red-500">
        <RiDeleteBin7Fill />
      </TButton>
      <TCheckbox name="group1-name" hover tight v-model="group.showName">Show Name</TCheckbox>
    </div>
    <VueDraggable
      ref="el"
      v-model="group.bookmarks"
      handle=".drag-handle"
      class="flex flex-wrap gap-1"
    >
      <div v-for="(bookmark, i) in group.bookmarks" :key="i" class="relative group">
        <TBookmark :name="bookmark.name" :icon="bookmark.favicon" element="div" />
        <div
          class="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center duration-300 ease-in-out rounded opacity-0 bg-gray-300/50 backdrop-blur-sm group-hover:opacity-100"
        >
          <TButton variant="plain" block rounded class="flex-grow text-red-500">
            <RiDeleteBin7Fill />
          </TButton>
          <TButton variant="plain" block rounded class="flex-grow drag-handle">
            <RiDragMove2Line />
          </TButton>
          <TButton
            variant="plain"
            block
            rounded
            class="flex-grow"
            @click="editModal = { visible: true, group: group.name, bookmark: clone(bookmark) }"
          >
            <RiPencilFill />
          </TButton>
        </div>
      </div>
    </VueDraggable>

    <div v-if="group.bookmarks.length === 0" class="flex gap-1">
      <h4 class="my-2">No Bookmarks</h4>
    </div>
  </div>

  <div class="flex gap-4">
    <TButton block size="lg" variant="secondary">
      <RiLayoutGridFill class="w-5 h-5" /> Add Group
    </TButton>
    <TButton block size="lg"><RiBookmarkFill class="w-5 h-5" /> New Bookmark</TButton>
  </div>

  <TModal :isOpen="editModal.visible" size="sm" @close="editModal = { visible: false }">
    <template #title>Edit "{{ editModal.bookmark?.name }}"</template>
    <template #content v-if="editModal.bookmark">
      <TTextInput v-model="editModal.bookmark.name" labelClass="w-24">Name:</TTextInput>
      <TTextInput v-model="editModal.bookmark.url" labelClass="w-24">URL:</TTextInput>
      <TCheckbox
        v-model="editModal.bookmark.invert"
        reverse
        hover
        labelClass="w-24"
        flush
        class="py-2"
        >Invert:</TCheckbox
      >
    </template>
    <template #action-buttons v-if="editModal.group && editModal.bookmark">
      <TButton block @click="overwriteBookmark(editModal.group, editModal.bookmark)">Save</TButton>
      <TButton block variant="link" @click="editModal = { visible: false }">Cancel</TButton>
    </template>
  </TModal>
</template>
