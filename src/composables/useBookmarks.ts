import { useStorage } from '@vueuse/core'
import { nanoid } from 'nanoid'

const VERSION = 2

export type Bookmarks = {
  VERSION: number
  groups: Array<BookmarkGroup>
}
export type BookmarkGroup = {
  id: string
  name: string
  showName: boolean
  bookmarks: Array<Bookmark>
}
export type Bookmark = {
  id: string
  invert: boolean
  name: string
  url: string
  favicon: string
}

const bookmarks = useStorage<Bookmarks>('cnt-bookmarks', {
  VERSION,
  groups: [],
})

export function useBookmarks() {
  if (bookmarks.value.VERSION !== VERSION) {
    const newBookmarks: Bookmarks = {
      VERSION,
      groups: [
        {
          name: 'Default',
          id: nanoid(),
          showName: false,
          bookmarks: (bookmarks.value as unknown as Bookmark[]).map((b) => ({
            ...b,
            id: nanoid(),
            invert: false,
          })),
        },
      ],
    }
    bookmarks.value = newBookmarks
  }

  return { bookmarks }
}
