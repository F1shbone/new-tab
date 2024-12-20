import { ref } from 'vue'
import { useStorage } from '@vueuse/core'

export type Bookmark = {
  name: string
  url: string
  favicon: string
}

const bookmarks = useStorage<Array<Bookmark>>('cnt-bookmarks', [])

export function useBookmarks() {
  return { bookmarks }
}
