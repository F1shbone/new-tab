<script setup lang="ts">
import TListbox from '@/components/TListbox.vue'
import TListboxItem from '@/components/TListboxItem.vue'
import TCheckbox from '@/components/TCheckbox.vue'
import TTimerInput from '@/components/TTimerInput.vue'

import { useAlarmClockStore } from '@/stores/alarmclock'
import { storeToRefs } from 'pinia'

const { hours, minutes, seconds, enabled } = storeToRefs(useAlarmClockStore())
</script>

<template>
  <h1 class="mb-8 text-4xl font-bold tracking-tight">Alarmclock</h1>

  <TListbox>
    <TListboxItem flush>
      <h4 class="mt-2 ml-3 font-thin tracking-tight text-gray-700 uppercase">General</h4>
      <TCheckbox name="enabled" v-model="enabled">Enable Widget</TCheckbox>
    </TListboxItem>
    <TListboxItem flush>
      <h4 class="mt-2 ml-3 font-thin tracking-tight text-gray-700 uppercase">Default Duration</h4>
      <TTimerInput v-model:hours="hours" v-model:minutes="minutes" v-model:seconds="seconds" />
    </TListboxItem>
  </TListbox>
</template>
