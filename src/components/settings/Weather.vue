<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { watchDebounced } from '@vueuse/core'
import { RiCloseLine } from '@remixicon/vue'

import TListbox from '@/components/TListbox.vue'
import TListboxItem from '@/components/TListboxItem.vue'
import TCheckbox from '@/components/TCheckbox.vue'
import TButton from '@/components/TButton.vue'
import TModal from '@/components/TModal.vue'
import TTextInput from '@/components/TTextInput.vue'

import { useFetch } from '@/composables/useFetch'
import { useWeatherStore, type WeatherLocation } from '@/stores/weather'

type LocationApiResponse = {
  id: number
  name: string
  latitude: number
  longitude: number
  elevation: number
  feature_code: string
  country_code: string
  admin1_id: number
  admin2_id: number
  admin3_id: number
  admin4_id: number
  timezone: string
  population: number
  country_id: number
  country: string
  admin1: string
  admin2: string
  admin3: string
  admin4: string
}

const { enabled, locations } = storeToRefs(useWeatherStore())
const {
  data: locationResults,
  execute,
  clearResults,
  error,
} = useFetch<Array<LocationApiResponse>>(
  async () => {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(locationSearch.value)}&count=10&language=en&format=json`,
    )
    if (!response.ok) {
      throw new Error('Cound not search for locations')
    }
    return (await response.json()).results
  },
  { immediate: false },
)

const locationModal = ref(false)
const locationSearch = ref('')
watchDebounced(locationSearch, execute, { debounce: 250 })

function addLocation(location: LocationApiResponse) {
  locations.value.push({
    id: location.id.toString(),
    name: location.name,
    lat: location.latitude,
    lon: location.longitude,
    elevation: location.elevation,
    timezone: location.timezone,
    country: {
      short: location.country_code,
      long: location.country,
    },
  })
  closeLocationModal()
}
function closeLocationModal() {
  locationModal.value = false
  locationSearch.value = ''
  clearResults()
}
</script>

<template>
  <h1 class="mb-8 text-4xl font-bold tracking-tight">Weather</h1>

  <TListbox>
    <template #title>General</template>
    <TListboxItem>
      <TCheckbox name="enabled" v-model="enabled" flush>Enable Widget</TCheckbox>
    </TListboxItem>
  </TListbox>

  <TListbox>
    <template #title>Locations</template>
    <TListboxItem class="flex items-center" v-for="(location, i) in locations" :key="i">
      <div class="flex-grow">
        <div>{{ location.country.short }}, {{ location.name }}</div>
        <div class="flex gap-4 mt-2 font-mono text-xs text-gray-600">
          <div>lat: {{ location.lat }}</div>
          <div>lon: {{ location.lon }}</div>
        </div>
      </div>
      <TButton
        variant="link"
        square
        size="sm"
        class="hover:text-red-500"
        @click="locations.splice(i, 1)"
      >
        <RiCloseLine class="w-6 h-6" />
      </TButton>
    </TListboxItem>
    <TListboxItem v-if="locations.length === 0" class="text-gray-700">
      No locations added yet.
    </TListboxItem>
    <div class="p-2">
      <TButton block @click="locationModal = true">Add Location</TButton>
    </div>
  </TListbox>

  <TModal :isOpen="locationModal" size="sm" @close="closeLocationModal">
    <template #title>Add Location</template>
    <template #content>
      <TTextInput v-model="locationSearch">Search by city name</TTextInput>
      <hr />
      <h4 class="my-1 text-lg font-bold tracking-tight">Results</h4>
      <div class="flex flex-col">
        <TButton
          v-for="(location, i) in locationResults"
          :key="i"
          block
          variant="link"
          @click="addLocation(location)"
        >
          <div class="flex flex-col items-start flex-grow">
            <div>{{ location.country_code }}, {{ location.name }}</div>
            <div class="mt-1 font-mono text-xs text-gray-600">
              {{ location.admin1 }} - {{ location.admin2 }} - {{ location.admin3 }}
            </div>
          </div>
        </TButton>
      </div>
    </template>
    <template #action-buttons>
      <TButton block variant="link" @click="closeLocationModal">Cancel</TButton>
    </template>
  </TModal>
</template>
