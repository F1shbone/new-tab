<script setup lang="ts">
import TRadio from '@/components/TRadio.vue'
import TCheckbox from '@/components/TCheckbox.vue'
import TListbox from '@/components/TListbox.vue'
import TListboxItem from '@/components/TListboxItem.vue'
import { ref } from 'vue'

const clockFormat = ref('24-hours')
const dateFormat = ref('DD.MM.YYYY')
const showDayName = ref(true)
</script>

<template>
  <h1 class="mb-8 text-4xl font-bold tracking-tight">Clock</h1>

  <TListbox>
    <template #title>Clock Format</template>

    <TListboxItem flush>
      <TRadio name="clockFormat" value="24-hours" v-model="clockFormat">24 Hours</TRadio>
    </TListboxItem>
    <TListboxItem flush>
      <TRadio name="clockFormat" value="12-hours" v-model="clockFormat">12 Hours</TRadio>
    </TListboxItem>
  </TListbox>

  <TListbox>
    <template #title>Date Format</template>

    <TListboxItem flush>
      <TRadio name="dateFormat" value="DD.MM.YYYY" v-model="dateFormat">
        <code class="w-32">DD.MM.YYYY</code> (e.g. 14.01.2024)
      </TRadio>
    </TListboxItem>
    <TListboxItem flush>
      <TRadio name="dateFormat" value="DD.MM.YY" v-model="dateFormat">
        <code class="w-32">DD.MM.YY</code> (e.g. 14.01.24)
      </TRadio>
    </TListboxItem>
    <TListboxItem flush>
      <TRadio name="dateFormat" value="D.M.YY" v-model="dateFormat">
        <code class="w-32">D.M.YY</code> (e.g. 1.1.24)
      </TRadio>
    </TListboxItem>
  </TListbox>

  <TListbox>
    <TListboxItem flush>
      <TCheckbox name="clockFormat" v-model="showDayName">Show Day Name</TCheckbox>
    </TListboxItem>
  </TListbox>
</template>
