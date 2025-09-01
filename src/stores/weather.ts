import { ref } from 'vue'
import { defineStore } from 'pinia'

export type WeatherLocation = {
  id: string
  name: string
  lat: number
  lon: number
  elevation: number
  timezone: string
  country: {
    long: string
    short: string
  }
}

export const useWeatherStore = defineStore(
  'cnt-settings-widgets-weather',
  () => {
    const VERSION = ref(1)
    const enabled = ref(true)
    const locations = ref<WeatherLocation[]>([])

    return {
      VERSION,
      enabled,
      locations,
    }
  },
  {
    persist: true,
  },
)
