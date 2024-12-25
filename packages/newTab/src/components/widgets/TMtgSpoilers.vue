<script setup lang="ts">
import { useDateFormat, useFetch, useStorage } from '@vueuse/core'
import TCard from '@/components/TCard.vue'

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
const { isFetching, error, data, onFetchResponse } = useFetch('https://api.scryfall.com/sets')
  .get()
  .json<{
    object: string
    has_more: boolean
    data: Array<Set>
    code?: string
    status?: number
    details?: string
  }>()

onFetchResponse(async () => {
  const response = data.value?.data.filter((e) => {
    return (
      new Date(e.released_at) > new Date() &&
      !e.digital &&
      (e.set_type === 'expansion' || e.set_type === 'masters')
    )
  })
  const oldSets = mtg.value.sets
  mtg.value.sets = response ?? []
  mtg.value.sets.forEach((e) => {
    const oldSet = oldSets.find((s) => s.id === e.id)
    e.updated = e.card_count - (oldSet?.card_count ?? 0)
  })
})
</script>

<template>
  <TCard :isError="error" :isEmpty="mtg.sets.length === 0">
    <template #title>Scryfall</template>
    <template #error>
      <p>{{ data?.details }}</p>
      <p class="text-sm text-gray-600">{{ data?.status }} - {{ data?.code }}</p>
    </template>
    <template #empty>No upcoming sets found</template>
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
          v-for="set in mtg.sets"
          :key="set.id"
          :href="`${set.scryfall_uri}?order=spoiled`"
          target="_blank"
          class="flex items-center gap-4 p-2 mt-2 rounded-lg hover:bg-gray-500/30"
        >
          <div class="grow">
            <h4 class="flex gap-2 text-xl">
              {{ set.name }}
              <span class="mt-1 font-mono text-base text-orange-700">({{ set.code }})</span>
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
