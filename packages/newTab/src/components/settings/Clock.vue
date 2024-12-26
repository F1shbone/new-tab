<script setup lang="ts">
import { storeToRefs } from 'pinia'

import TRadio from '@/components/TRadio.vue'
import TCheckbox from '@/components/TCheckbox.vue'
import TListbox from '@/components/TListbox.vue'
import TListboxItem from '@/components/TListboxItem.vue'

import { useClockStore } from '@/stores/clock'

const { timeFormat, _dateFormat, showDayName } = storeToRefs(useClockStore())
</script>

<template>
  <h1 class="mb-8 text-4xl font-bold tracking-tight">Clock</h1>

  <TListbox>
    <template #title>Clock Format</template>

    <TListboxItem flush>
      <TRadio name="timeFormat" value="HH:mm" v-model="timeFormat">
        <code>24 Hours</code>
      </TRadio>
    </TListboxItem>
    <TListboxItem flush>
      <TRadio name="timeFormat" value="hh:mm A" v-model="timeFormat">
        <code>12 Hours</code>
      </TRadio>
    </TListboxItem>
    <TListboxItem flush>
      <TRadio name="timeFormat" value="" v-model="timeFormat">
        <code>No Time</code>
      </TRadio>
    </TListboxItem>
  </TListbox>

  <TListbox>
    <template #title>Date Format</template>

    <TListboxItem flush>
      <TRadio name="dateFormat" value="DD.MM.YYYY" v-model="_dateFormat">
        <code class="w-32">DD.MM.YYYY</code> (e.g. 14.01.2024)
      </TRadio>
    </TListboxItem>
    <TListboxItem flush>
      <TRadio name="dateFormat" value="DD.MM.YY" v-model="_dateFormat">
        <code class="w-32">DD.MM.YY</code> (e.g. 14.01.24)
      </TRadio>
    </TListboxItem>
    <TListboxItem flush>
      <TRadio name="dateFormat" value="D.M.YY" v-model="_dateFormat">
        <code class="w-32">D.M.YY</code> (e.g. 1.1.24)
      </TRadio>
    </TListboxItem>
    <TListboxItem flush>
      <TRadio name="dateFormat" value="" v-model="_dateFormat">
        <code class="w-32">No Date</code>
      </TRadio>
    </TListboxItem>
  </TListbox>

  <TListbox>
    <TListboxItem flush>
      <TCheckbox name="clockFormat" v-model="showDayName">Show Day Name</TCheckbox>
    </TListboxItem>
  </TListbox>
</template>
