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
    <template #title>General</template>
    <TListboxItem>
      <TCheckbox name="enabled" v-model="enabled" flush>Enable Widget</TCheckbox>
    </TListboxItem>
  </TListbox>

  <TListbox>
    <template #title>Clock</template>
    <TListboxItem class="flex">
      <span class="flex-grow">Default Duration</span>
      <TTimerInput v-model:hours="hours" v-model:minutes="minutes" v-model:seconds="seconds" />
    </TListboxItem>
  </TListbox>
</template>
