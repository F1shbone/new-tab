<script setup lang="ts">
import { isRef, ref, toRaw, type MaybeRef } from 'vue'
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

import NewBookmarkGroup from './NewBookmarkGroup.vue'
import EditBookmarks from './EditBookmarks.vue'

import { type Bookmark, type BookmarkGroup, useBookmarks } from '@/composables/useBookmarks'
import NewBookmarks from './NewBookmarks.vue'

function clone<T>(obj: T) {
  return structuredClone<T>(toRaw(obj))
}

const { bookmarks } = useBookmarks()

//#region New Group Modal
const newGroupModal = ref(false)
function createGroup(group: BookmarkGroup) {
  bookmarks.value.groups.push(group)
  newGroupModal.value = false
}
//#endregion

//#region Edit Bookmark Modal
const editBookmarkModal = ref<{ visible: boolean; groupId?: string; bookmark?: Bookmark }>({
  visible: false,
})
function overwriteBookmark(newBookmark: Bookmark) {
  const groupIndex = bookmarks.value.groups.findIndex(
    (g) => g.id === editBookmarkModal.value.groupId,
  )
  const index = bookmarks.value.groups[groupIndex].bookmarks.findIndex(
    (b) => b.id === newBookmark.id,
  )

  if (groupIndex === -1 || index === -1) return

  bookmarks.value.groups[groupIndex].bookmarks[index] = newBookmark
  editBookmarkModal.value = { visible: false }
}
//#endregion

//#region Add Bookmark Modal
const newBookmarkModal = ref<{ visible: boolean; groupId?: string }>({ visible: false })
function createBookmark(newBookmark: Bookmark) {
  const groupIndex = bookmarks.value.groups.findIndex(
    (g) => g.id === newBookmarkModal.value.groupId,
  )

  if (groupIndex === -1) return

  bookmarks.value.groups[groupIndex].bookmarks.push(newBookmark)
  newBookmarkModal.value = { visible: false }
}
//#endregion
</script>

<template>
  <h1 class="mb-8 text-4xl font-bold tracking-tight">Bookmarks</h1>

  <div v-for="(group, i) in bookmarks.groups" :key="i" class="py-4 mb-4 border-b border-gray-300">
    <div class="flex items-center gap-2 mb-2">
      <h4 class="font-thin tracking-tight text-gray-600 uppercase">{{ group.name }}</h4>
      <TButton variant="link" square size="sm"><RiPencilFill /></TButton>
      <TButton
        v-if="i > 0"
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
    <VueDraggable
      v-model="group.bookmarks"
      group="bookmarks"
      handle=".drag-handle"
      class="flex flex-wrap gap-1"
    >
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
    <TButton block size="lg" variant="secondary" @click="newGroupModal = true">
      <RiLayoutGridFill class="w-5 h-5" /> Add Group
    </TButton>
    <TButton
      block
      size="lg"
      @click="
        newBookmarkModal = {
          visible: true,
          groupId: bookmarks.groups[0].id,
        }
      "
      ><RiBookmarkFill class="w-5 h-5" /> New Bookmark</TButton
    >
  </div>

  <NewBookmarkGroup v-model:visible="newGroupModal" @createGroup="createGroup" />

  <EditBookmarks
    v-if="editBookmarkModal.bookmark"
    v-model:visible="editBookmarkModal.visible"
    :bookmark="editBookmarkModal.bookmark"
    @update="(val) => overwriteBookmark(val)"
  />

  <NewBookmarks v-model:visible="newBookmarkModal.visible" @create="(val) => createBookmark(val)" />
</template>
