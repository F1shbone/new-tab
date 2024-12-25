<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDateFormat, useTimeAgo } from '@vueuse/core'
import { RiChat1Line, RiLink, RiTimeLine, RiBardLine, RiRefreshLine } from '@remixicon/vue'

import TButton from '@/components/TButton.vue'
import TCard from '@/components/TCard.vue'
import THackernewsSkeleton from '@/components/THackernewsSkeleton.vue'
import { useFetch } from '@/composables/useFetch'

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
  url?: string | undefined
  host?: string | undefined
  path?: string | undefined
}

const { isFetching, data, execute, error } = useFetch(async () => {
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
      if (e.url) {
        const url = new URL(e.url)
        e.host = url.host.replace('www.', '')
        e.path = url.pathname
      }
      e.date = useDateFormat(new Date(e.time * 1000), 'DD.MM.YYYY').value
      return e
    })
  })
})

const sortBy = ref<'score' | 'time'>('score')
const dataSorted = computed(() =>
  [...(data.value ?? [])].sort((a, b) => b[sortBy.value] - a[sortBy.value]),
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
  <TCard flush class="flex flex-col h-full overflow-hidden">
    <div class="flex items-end p-2 my-2">
      <h2 class="ml-2 text-4xl font-bold tracking-tight grow">Hackernews</h2>
      <TButton variant="link" @click="execute">
        <span class="hidden 2xl:block">Refresh</span>
        <div class="w-7 h-7 p-1.5 text-white bg-orange-700 rounded-full">
          <RiRefreshLine class="w-4 h-4" />
        </div>
      </TButton>
      <TButton variant="link" @click="toggleSortBy">
        <span class="hidden 2xl:block">Sort by</span>
        <div class="w-7 h-7 p-1.5 text-white bg-orange-700 rounded-full">
          <RiTimeLine v-if="sortBy === 'time'" class="w-4 h-4" />
          <RiBardLine v-if="sortBy === 'score'" class="w-4 h-4" />
        </div>
      </TButton>
    </div>
    <div class="max-h-full px-2 overflow-auto grow">
      <div v-if="isFetching" class="h-full">
        <THackernewsSkeleton v-for="i in Array(15)" :key="i" />
      </div>
      <div v-else-if="error">{{ error }}</div>
      <template v-else>
        <a
          v-for="(item, i) in dataSorted"
          :key="i"
          :href="`https://news.ycombinator.com/item?id=${item.id}`"
          target="_blank"
          class="block p-2 transition-colors rounded-lg hover:bg-gray-500/30"
          :class="{
            'my-2': i > 0,
            'mb-2': i === 0,
          }"
        >
          <div class="flex items-start gap-4">
            <div class="overflow-hidden grow">
              <h4 class="text-xl">{{ item.title }}</h4>
              <h5 class="flex items-center gap-2 my-1 text-xs" v-if="item.url">
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
  </TCard>
</template>
