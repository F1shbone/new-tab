<script setup lang="ts">
import { RiRefreshLine } from '@remixicon/vue'

import TCard from '@/components/TCard.vue'
import TButton from '@/components/TButton.vue'
import { useFetch } from '@/composables/useFetch'
import { useWeatherStore } from '@/stores/weather'

const weatherSettings = useWeatherStore()
//
</script>

<template>
  <!-- <TCard :isError="error" :isEmpty="mtg.sets.length === 0" flushTitle> -->
  <TCard flushTitle>
    <template #title>
      <h2 class="ml-2 text-2xl font-bold tracking-tight grow">Weather</h2>
    </template>
    <template #action>
      <!-- <TButton variant="link" @click="execute"> -->
      <TButton variant="link">
        Refresh
        <div class="w-7 h-7 p-1.5 text-white bg-orange-700 rounded-full">
          <RiRefreshLine class="w-4 h-4" />
        </div>
      </TButton>
    </template>
  </TCard>
  <!--  -->
</template>
