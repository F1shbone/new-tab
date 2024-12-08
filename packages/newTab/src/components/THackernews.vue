<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { RiChat1Line, RiBardFill } from '@remixicon/vue'

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

const { isFetching, error, data } = useFetch(async () => {
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
      .reduce((acc: Record<string, Array<HackernewsStory>>, val) => {
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
  <div class="h-full overflow-x-scroll">
    <ol v-for="(news, date, i) in data" :key="date" class="relative mr-4 border-gray-700 border-e">
      <li
        :class="{
          'pb-2': i !== Object.keys(data ?? {}).length - 1,
          'mx-4': true,
        }"
      >
        <div class="absolute w-3 h-3 rounded-full mt-1.5 -end-1.5 bg-orange-700" />
        <time class="block pt-1 font-normal leading-none text-right text-orange-700">{{
          date
        }}</time>
        <a
          class="w-full p-2 text-left transition-colors select-none group"
          v-for="item in news"
          :key="item.id"
          :href="`https://news.ycombinator.com/item?id=${item.id}`"
          target="_blank"
        >
          <p class="overflow-hidden">
            {{ item.title }}
          </p>

          <div class="flex items-center gap-4 mt-2">
            <time class="ml-2 text-sm text-gray-700">
              {{ useDateFormat(new Date(item.time * 1000), 'HH:mm') }}
            </time>
            <div
              class="flex gap-1 items-center px-2 py-.5 border border-black transition-colors rounded-2xl group-hover:text-white group-hover:bg-gray-800"
            >
              <RiBardFill class="w-4 h-4" /> {{ item.score }}
            </div>
            <div
              class="flex gap-1 items-center px-2 py-.5 border border-black transition-colors rounded-2xl group-hover:text-white group-hover:bg-gray-800"
            >
              <RiChat1Line class="w-4 h-4" /> {{ item.kids?.length ?? 0 }}
            </div>
          </div>
        </a>
      </li>
    </ol>
  </div>
</template>
