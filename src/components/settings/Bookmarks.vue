<script setup lang="ts">
import {
  RiLayoutGridFill,
  RiBookmarkFill,
  RiDragMove2Line,
  RiPencilFill,
  RiCloseFill,
} from '@remixicon/vue'

import TListbox from '@/components/TListbox.vue'
import TListboxItem from '@/components/TListboxItem.vue'
import TRadio from '@/components/TRadio.vue'
import TButton from '@/components/TButton.vue'
import TButtonBar from '@/components/TButtonBar.vue'
import TBookmark from '@/components/TBookmark.vue'

import { useBookmarks } from '@/composables/useBookmarks'

const { bookmarks } = useBookmarks()
//
</script>

<template>
  <h1 class="mb-8 text-4xl font-bold tracking-tight">Bookmarks</h1>

  <div class="flex gap-1 py-4 mb-4 border-t border-b border-gray-300">
    <div class="relative group" v-for="(bookmark, i) in bookmarks" :key="i">
      <TBookmark :name="bookmark.name" :icon="bookmark.favicon" element="div" />
      <div
        class="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center duration-300 ease-in-out rounded opacity-0 bg-gray-300/50 backdrop-blur-sm group-hover:opacity-100"
      >
        <Button class="flex-grow w-full text-red-500 transition-colors rounded hover:bg-white/75">
          <RiCloseFill class="mx-auto" />
        </Button>
        <Button class="flex-grow w-full transition-colors rounded cursor-move hover:bg-white/75">
          <RiDragMove2Line class="mx-auto" />
        </Button>
        <Button class="flex-grow w-full transition-colors rounded hover:bg-white/75">
          <RiPencilFill class="mx-auto" />
        </Button>
      </div>
    </div>
  </div>

  <div class="flex gap-4">
    <TButton block size="lg" variant="secondary">
      <RiLayoutGridFill class="w-5 h-5" /> Add Group
    </TButton>
    <TButton block size="lg"><RiBookmarkFill class="w-5 h-5" /> New Bookmark</TButton>
  </div>
</template>
