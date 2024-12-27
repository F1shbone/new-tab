import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useAlarmClockStore = defineStore(
  'cnt-settings-widgets-alarmclock',
  () => {
    const hours = ref(0)
    const minutes = ref(5)
    const seconds = ref(0)
    return {
      hours,
      minutes,
      seconds,
    }
  },
  {
    persist: true,
  },
)
