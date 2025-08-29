<script setup lang="ts">
import { ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { nanoid } from 'nanoid'
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

function clone<T>(obj: T) {
  return JSON.parse(JSON.stringify(obj))
}

const { bookmarks } = useBookmarks()

//#region Edit Bookmark Modal
const editBookmarkModal = ref<{ visible: boolean; groupId?: string; bookmark?: Bookmark }>({
  visible: false,
})
function overwriteBookmark(groupId: string, newBookmark: Bookmark) {
  const groupIndex = bookmarks.value.groups.findIndex((g) => g.id === groupId)
  const index = bookmarks.value.groups[groupIndex].bookmarks.findIndex(
    (b) => b.id === newBookmark.id,
  )

  bookmarks.value.groups[groupIndex].bookmarks[index] = newBookmark
  editBookmarkModal.value = { visible: false }
}
//#endregion

//#region New Group Modal
const newGroupModal = ref<{ visible: boolean; name?: string }>({ visible: false })
function createGroup(name: string) {
  bookmarks.value.groups.push({
    id: nanoid(),
    name,
    showName: false,
    bookmarks: [],
  })
  newGroupModal.value = { visible: false }
}
//#endregion

//#region Add Bookmark Modal
const newBookmarkModal = ref<{ visible: boolean; bookmark?: Bookmark }>({ visible: false })
//#endregion
</script>

<template>
  <h1 class="mb-8 text-4xl font-bold tracking-tight">Bookmarks</h1>

  <div v-for="(group, i) in bookmarks.groups" :key="i" class="py-4 mb-4 border-b border-gray-300">
    <div class="flex items-center gap-2 mb-2">
      <h4 class="font-thin tracking-tight text-gray-600 uppercase">{{ group.name }}</h4>
      <TButton variant="link" square size="sm"><RiPencilFill /></TButton>
      <TButton
        variant="link"
        square
        size="sm"
        class="hover:text-red-500"
        @click="bookmarks.groups.splice(i, 1)"
      >
        <RiDeleteBin7Fill />
      </TButton>
      <TCheckbox name="group1-name" hover tight v-model="group.showName">Show Name</TCheckbox>
    </div>
    <VueDraggable v-model="group.bookmarks" handle=".drag-handle" class="flex flex-wrap gap-1">
      <div v-for="(bookmark, i) in group.bookmarks" :key="i" class="relative group">
        <TBookmark
          :name="bookmark.name"
          :icon="bookmark.favicon"
          :invert="bookmark.invert"
          element="div"
        />
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
            @click="
              editBookmarkModal = { visible: true, groupId: group.id, bookmark: clone(bookmark) }
            "
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
    <TButton
      block
      size="lg"
      variant="secondary"
      @click="newGroupModal = { visible: true, name: '' }"
    >
      <RiLayoutGridFill class="w-5 h-5" /> Add Group
    </TButton>
    <TButton
      block
      size="lg"
      @click="
        newBookmarkModal = {
          visible: true,
          bookmark: {
            id: nanoid(),
            name: '',
            url: '',
            favicon: '',
            invert: false,
          },
        }
      "
      ><RiBookmarkFill class="w-5 h-5" /> New Bookmark</TButton
    >
  </div>

  <TModal
    :isOpen="editBookmarkModal.visible"
    size="sm"
    @close="editBookmarkModal = { visible: false }"
  >
    <template #title>Edit "{{ editBookmarkModal.bookmark?.name }}"</template>
    <template #content v-if="editBookmarkModal.bookmark">
      <div class="flex gap-4">
        <TBookmark
          element="div"
          :name="editBookmarkModal.bookmark.name"
          :href="editBookmarkModal.bookmark.url"
          :icon="editBookmarkModal.bookmark.favicon"
          :invert="editBookmarkModal.bookmark.invert"
        />
        <div>
          <TTextInput v-model="editBookmarkModal.bookmark.name" labelClass="w-24">Name:</TTextInput>
          <TTextInput v-model="editBookmarkModal.bookmark.url" labelClass="w-24">URL:</TTextInput>
          <TCheckbox
            v-model="editBookmarkModal.bookmark.invert"
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
    <template #action-buttons v-if="editBookmarkModal.groupId && editBookmarkModal.bookmark">
      <TButton
        block
        @click="overwriteBookmark(editBookmarkModal.groupId, editBookmarkModal.bookmark)"
        >Save</TButton
      >
      <TButton block variant="link" @click="editBookmarkModal = { visible: false }">Cancel</TButton>
    </template>
  </TModal>

  <TModal :isOpen="newGroupModal.visible" size="sm" @close="newGroupModal = { visible: false }">
    <template #title>Add new Group</template>
    <template #content v-if="newGroupModal.name !== undefined">
      <TTextInput v-model="newGroupModal.name" labelClass="w-24">Name:</TTextInput>
      <Transition>
        <span v-if="newGroupModal.name === ''" class="text-sm text-red-500"
          >Name cannot be empty</span
        >
      </Transition>
    </template>
    <template #action-buttons v-if="newGroupModal.name !== undefined">
      <TButton block :disabled="newGroupModal.name === ''" @click="createGroup(newGroupModal.name)"
        >Save</TButton
      >
      <TButton block variant="link" @click="newGroupModal = { visible: false }">Cancel</TButton>
    </template>
  </TModal>

  <TModal
    :isOpen="newBookmarkModal.visible"
    size="sm"
    @close="newBookmarkModal = { visible: false }"
  >
    <template #title>New Bookmark</template>
    <template #content v-if="newBookmarkModal.bookmark">
      <TTextInput v-model="newBookmarkModal.bookmark.name" labelClass="w-24">Name:</TTextInput>
      <Transition>
        <span v-if="newBookmarkModal.bookmark.name === ''" class="text-sm text-red-500"
          >Name cannot be empty</span
        >
      </Transition>
      <TTextInput v-model="newBookmarkModal.bookmark.url" labelClass="w-24">URL:</TTextInput>
      <TCheckbox
        v-model="newBookmarkModal.bookmark.invert"
        reverse
        hover
        labelClass="w-24"
        flush
        class="py-2"
        >Invert:</TCheckbox
      >
    </template>
    <template #action-buttons v-if="newBookmarkModal.bookmark">
      <TButton block :disabled="newBookmarkModal.bookmark.name === ''">Save</TButton>
      <TButton block variant="link" @click="newBookmarkModal = { visible: false }">Cancel</TButton>
    </template>
  </TModal>
</template>
