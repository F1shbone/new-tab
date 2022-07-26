import { useStorage } from '@vueuse/core';

const bookmarks = useStorage('cnt-bookmarks', []);

export function useBookmarks() {
  return bookmarks;
}
