import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useAlarmClockStore = defineStore(
  'cnt-settings-widgets-alarmclock',
  () => {
    const enabled = ref(true)
    const hours = ref(0)
    const minutes = ref(5)
    const seconds = ref(0)
    return {
      enabled,
      hours,
      minutes,
      seconds,
    }
  },
  {
    persist: true,
  },
)
