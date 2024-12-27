<script setup lang="ts">
import TListbox from '@/components/TListbox.vue'
import TListboxItem from '@/components/TListboxItem.vue'
import TTimerInput from '@/components/TTimerInput.vue'

import { useAlarmClockStore } from '@/stores/alarmclock'
import { storeToRefs } from 'pinia'

const { hours, minutes, seconds } = storeToRefs(useAlarmClockStore())
</script>

<template>
  <h1 class="mb-8 text-4xl font-bold tracking-tight">Alarmclock</h1>

  <TListbox>
    <template #title>Default Duration</template>

    <TListboxItem>
      <TTimerInput v-model:hours="hours" v-model:minutes="minutes" v-model:seconds="seconds" />
    </TListboxItem>
  </TListbox>
</template>
