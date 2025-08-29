import { ref, readonly } from 'vue'
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
    const VERSION = readonly(ref(1))
    const enabled = ref(true)
    const locations = ref<WeatherLocation[]>([
      /*
      {
        id: '2820756'
        name: 'Türkenfeld',
        lat: 48.10531,
        lon: 11.08303,
        elevation: 603,
        timezone: 'Europe/Berlin',
        country: {
          long: 'Germany',
          short: 'DE',
        },
      }
      */
    ])

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
