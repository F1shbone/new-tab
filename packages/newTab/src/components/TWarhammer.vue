<script setup lang="ts">
import TLoader from './TLoader.vue'
import TTimeline from './TTimeline.vue'
import { useFetch } from '../composables/useFetch'

//
const { isFetching, data, execute } = useFetch(async () => {
  // https://pikeuk.azurewebsites.net/warcom.rss
  const response = await fetch('https://www.warhammer-community.com/en-gb/', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/rss',
    },
  })
  if (!response.ok) {
    throw new Error('Cound not load Hackernews top stories Ids')
  }
  const text = await response.text()
  const data = new window.DOMParser().parseFromString(text, 'text/xml')
  console.log(data)
})

const items = {
  '09.12.2024': ['A', 'B', 'C'],
  '08.12.2024': ['A', 'B', 'C'],
}
</script>

<template>
  <TTimeline :items="items">
    <template #default="{ item }">
      <a
        class="w-full p-2 text-left transition-colors select-none group"
        :href="`https://www.warhammer-community.com/`"
        target="_blank"
      >
        <p>{{ item }}</p>
      </a>
    </template>
  </TTimeline>
</template>
