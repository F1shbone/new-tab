<script setup>
import { useBookmarks } from '../composables/useBookmarks';

import TBookmark from './TBookmark.vue';

const bookmarks = useBookmarks();
</script>

<template>
  <div class="flex flex-wrap content-start">
    <t-bookmark
      v-for="(bookmark, i) in bookmarks"
      :key="i"
      :name="bookmark.name"
      :href="bookmark.url"
    >
      <template #icon><img :src="bookmark.favicon" /></template>
    </t-bookmark>
  </div>
</template>
