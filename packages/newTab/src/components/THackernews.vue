<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { RiChat1Fill, RiBardFill } from '@remixicon/vue'

import TLoader from './TLoader.vue'
import TTimeline from './TTimeline.vue'
import { useFetch } from '../composables/useFetch'

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
    return data
      .map((e) => {
        e.date = useDateFormat(new Date(e.time * 1000), 'DD.MM.YYYY').value
        return e
      })
      .toSorted((a, b) => b.time - a.time)
      .reduce((acc: { [key: string]: Array<HackernewsStory> }, val) => {
        if (!acc[val.date]) {
          acc[val.date] = []
        }
        acc[val.date].push(val)
        return acc
      }, {})
  })
})
</script>

<template>
  <div v-if="isFetching" class="flex items-center justify-center">
    <TLoader />
  </div>
  <TTimeline v-if="!isFetching && data" :items="data" @refresh="execute">
    <template #default="{ item }">
      <a
        class="w-full p-2 text-left transition-colors select-none group"
        :href="`https://news.ycombinator.com/item?id=${item.id}`"
        target="_blank"
      >
        <p class="overflow-hidden">
          {{ item.title }}
        </p>

        <div class="flex items-center gap-4 mt-2">
          <div
            class="min-w-28 flex gap-3 px-2 py-.5 border border-black transition-colors rounded group-hover:text-white group-hover:bg-gray-800 justify-end"
          >
            <div class="flex items-center gap-1">
              <RiBardFill class="w-4 h-4 text-orange-700" /> {{ item.score }}
            </div>
            <div class="flex items-center gap-1">
              <RiChat1Fill class="w-4 h-4 text-orange-700" /> {{ item.kids?.length ?? 0 }}
            </div>
          </div>
          <div class="grow" />
          <time class="text-sm text-orange-700">
            {{ useDateFormat(new Date(item.time * 1000), 'HH:mm') }}
          </time>
        </div>
      </a>
    </template>
  </TTimeline>
</template>
