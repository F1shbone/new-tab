import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useClockStore = defineStore(
  'clock',
  () => {
    const timeFormat = ref('HH:mm')

    const _dateFormat = ref('DD.MM.YYYY')
    const dateFormat = computed({
      get() {
        if (showDayName.value && _dateFormat.value !== '') {
          return `dddd, ${_dateFormat.value}`
        } else {
          return _dateFormat.value
        }
      },
      set(val) {
        _dateFormat.value = val
      },
    })
    const showDayName = ref(true)

    return { timeFormat, _dateFormat, dateFormat, showDayName }
  },
  {
    persist: true,
  },
)
