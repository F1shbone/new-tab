<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDateFormat, useTimeAgo } from '@vueuse/core'
import { RiChat1Line, RiLink, RiTimeLine, RiBardLine, RiRefreshLine } from '@remixicon/vue'

import TButton from './TButton.vue'
import TLoader from './TLoader.vue'
import { useFetch } from '../composables/useFetch'
import THackernewsSkeleton from './THackernewsSkeleton.vue'

type HackernewsStory = {
  by: string
  descendants: number
  id: number
  kids: Array<number>
  score: number
  time: number
  date: string
  title: string
  type: 'story'
  url: string
  host: string
  path: string
}

const { isFetching, data, execute } = useFetch(async () => {
  const idResponse = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
  if (!idResponse.ok) {
    throw new Error('Cound not load Hackernews top stories Ids')
  }
  const ids: Array<string> = (await idResponse.json()).slice(0, 20)

  return Promise.all<HackernewsStory>(
    ids.map((id) => {
      return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((response) => {
        return response.json()
      })
    }),
  ).then((data) => {
    return data.map((e) => {
      const url = new URL(e.url)
      e.host = url.host.replace('www.', '')
      e.path = url.pathname
      e.date = useDateFormat(new Date(e.time * 1000), 'DD.MM.YYYY').value
      return e
    })
  })
})

const sortBy = ref<'score' | 'time'>('score')
const dataSorted = computed(() =>
  (data.value ?? []).toSorted((a, b) => b[sortBy.value] - a[sortBy.value]),
)
function toggleSortBy() {
  switch (sortBy.value) {
    case 'score': {
      sortBy.value = 'time'
      break
    }
    case 'time': {
      sortBy.value = 'score'
      break
    }
  }
}
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <div class="flex items-center justify-between p-2 mb-2">
      <TButton @click="execute"><RiRefreshLine class="w-4 h-4" /> Refresh</TButton>
      <h2 class="text-4xl font-bold tracking-tight">Hackernews</h2>
      <TButton variant="link" @click="toggleSortBy">
        Sort by:
        <div class="w-7 h-7 p-1.5 text-white bg-orange-700 rounded-full">
          <RiTimeLine v-if="sortBy === 'time'" class="w-4 h-4" />
          <RiBardLine v-if="sortBy === 'score'" class="w-4 h-4" />
        </div>
      </TButton>
    </div>
    <div class="max-h-full overflow-auto grow">
      <div v-if="isFetching" class="h-full">
        <THackernewsSkeleton v-for="i in Array(15)" :key="i" />
      </div>
      <template v-else>
        <a
          v-for="(item, i) in dataSorted"
          :key="i"
          :href="`https://news.ycombinator.com/item?id=${item.id}`"
          target="_blank"
          class="block px-4 py-2 transition-colors border-t border-black/25 hover:bg-white"
        >
          <div class="flex items-start gap-4">
            <div class="grow">
              <h4 class="text-xl">{{ item.title }}</h4>
              <h5 class="flex items-center gap-2 my-1 text-xs">
                <RiLink class="w-4 h-4 shrink-0" />
                <div>
                  <span class="font-bold text-orange-700">{{ item.host }}</span>
                  <span class="text-orange-700/50">{{ item.path }}</span>
                </div>
              </h5>

              <div class="flex items-center gap-4 mt-2 text-sm">
                <h5 class="text-xs text-black/75">
                  {{ item.score }} Points by {{ item.by }} &middot;
                  {{ useTimeAgo(item.time * 1000) }}
                </h5>
              </div>
            </div>
            <div class="flex flex-col gap-2 text-center text-black/75">
              <RiChat1Line class="w-6 h-6 text-orange-700" />
              {{ item.kids?.length ?? 0 }}
            </div>
          </div>
        </a>
      </template>
    </div>
  </div>
</template>
