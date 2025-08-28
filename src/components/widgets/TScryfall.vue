<script setup lang="ts">
import { useDateFormat, useStorage } from '@vueuse/core'
import { RiRefreshLine } from '@remixicon/vue'

import TButton from '@/components/TButton.vue'
import TCard from '@/components/TCard.vue'
import { useFetch } from '@/composables/useFetch'

type Set = {
  code: string
  id: string
  name: string
  uri: string
  scryfall_uri: string
  search_uri: string
  released_at: string
  set_type: string
  card_count: number
  digital: boolean
  icon_svg_uri: string
  updated?: number
}

const mtg = useStorage<{ sets: Array<Set> }>('cnt-mtg-spoilers', { sets: [] })
const { isFetching, error, data, onExecuteResponse, execute } = useFetch<{
  object: string
  has_more: boolean
  data: Array<Set>
  code?: string
  status?: number
  details?: string
}>(async () => {
  const response = await fetch('https://api.scryfall.com/sets')
  if (!response.ok) {
    throw new Error('Could not load Scryfall set information')
  }

  return await response.json()
})

onExecuteResponse(async () => {
  const response = data.value?.data.filter((e) => {
    return (
      new Date(e.released_at) > new Date() &&
      !e.digital &&
      e.icon_svg_uri.indexOf('default.svg') === -1 &&
      (e.set_type === 'expansion' || e.set_type === 'masters')
    )
  })
  const oldSets = mtg.value.sets
  mtg.value.sets = response ?? []
  mtg.value.sets.forEach((e) => {
    const oldSet = oldSets.find((s) => s.id === e.id)
    e.updated = e.card_count - (oldSet?.card_count ?? 0) + (oldSet?.updated ?? 0)
  })
})

function resetNewCards(set: Set) {
  set.updated = 0
}
</script>

<template>
  <TCard :isError="error" :isEmpty="mtg.sets.length === 0" flushTitle>
    <template #title>
      <h2 class="ml-2 text-2xl font-bold tracking-tight grow">Scryfall</h2>
    </template>
    <template #action>
      <TButton variant="link" @click="execute">
        Refresh
        <div class="w-7 h-7 p-1.5 text-white bg-orange-700 rounded-full">
          <RiRefreshLine class="w-4 h-4" />
        </div>
      </TButton>
    </template>
    <template #error>
      <p>{{ data?.details }}</p>
      <p class="text-sm text-gray-600">{{ data?.status }} - {{ data?.code }}</p>
    </template>
    <template #empty>
      <!-- https://duoicons.vercel.app/ -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="66"
        height="66"
        viewBox="0 0 24 24"
        class="opacity-65"
      >
        <path
          fill="#a8a29e99"
          d="m13.299 3.148 8.634 14.954a1.5 1.5 0 0 1-1.299 2.25H3.366a1.5 1.5 0 0 1-1.299-2.25l8.634-14.954c.577-1 2.02-1 2.598 0Z"
        />
        <path
          fill="#c2410c"
          d="M12 8a1 1 0 0 0-.993.883L11 9v4a1 1 0 0 0 1.993.117L13 13V9a1 1 0 0 0-1-1Zm0 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
        />
      </svg>
      No upcoming sets found
    </template>

    <div class="flex flex-col-reverse">
      <template v-if="isFetching">
        <div role="status" class="flex items-center gap-4 p-2 mt-2 transition-colors animate-pulse">
          <div class="grow">
            <div class="h-5 mb-2 bg-gray-700 rounded-full w-80" />
            <div class="h-3 mb-2 bg-gray-700 rounded-full w-60" />
            <div class="h-2 mb-2 bg-gray-700 rounded-full w-52" />
          </div>
          <div class="w-8 h-8 bg-gray-700 rounded-full" />
        </div>
      </template>
      <template v-else>
        <a
          v-for="(set, i) in mtg.sets"
          :key="set.id"
          :href="`${set.scryfall_uri}?order=spoiled`"
          target="_blank"
          class="flex items-center gap-4 p-2 transition-colors rounded-lg hover:bg-gray-500/30"
          :class="{
            'mt-2': i < mtg.sets.length - 1,
          }"
          @click="resetNewCards(set)"
        >
          <div class="grow">
            <h4 class="flex gap-2 text-xl">
              {{ set.name }}
              <span class="mt-1 font-mono text-base text-orange-700 uppercase"
                >({{ set.code }})</span
              >
            </h4>
            <p>New Cards: {{ set.updated }} / Spoiled: {{ set.card_count }}</p>
            <p class="text-sm text-gray-600">
              Release Date: {{ useDateFormat(set.released_at, 'DD.MM.YYYY') }}
            </p>
          </div>
          <img :src="set.icon_svg_uri" class="w-8 h-8" />
        </a>
      </template>
    </div>
  </TCard>
</template>
