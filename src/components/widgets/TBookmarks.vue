<script setup lang="ts">
import TBookmark from '@/components/TBookmark.vue'
import { useBookmarks } from '@/composables/useBookmarks'

const { bookmarks } = useBookmarks()
</script>

<template>
  <div>
    <div v-for="(group, i) in bookmarks.groups" :key="i" class="mb-4">
      <h4 v-if="group.showName" class="font-thin tracking-tight text-gray-600 uppercase">
        {{ group.name }}
      </h4>
      <div class="flex flex-wrap content-start">
        <TBookmark
          v-for="(bookmark, i) in group.bookmarks"
          :key="i"
          :name="bookmark.name"
          :href="bookmark.url"
          :icon="bookmark.favicon"
          :invert="bookmark.invert"
        />
      </div>
    </div>
  </div>
</template>
