<script setup lang="ts">
import TBookmark from '@/components/TBookmark.vue'
import { useBookmarks } from '@/composables/useBookmarks'

const { bookmarks } = useBookmarks()
</script>

<template>
  <div class="flex flex-wrap content-start">
    <TBookmark
      v-for="(bookmark, i) in bookmarks"
      :key="i"
      :name="bookmark.name"
      :href="bookmark.url"
      :icon="bookmark.favicon"
    />
  </div>
</template>
