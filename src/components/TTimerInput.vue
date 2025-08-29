<script setup lang="ts">
import TTimeInput from '@/components/TTimeInput.vue'

const hours = defineModel<number>('hours', { required: true })
const minutes = defineModel<number>('minutes', { required: true })
const seconds = defineModel<number>('seconds', { required: true })
</script>

<template>
  <div class="flex items-start justify-center">
    <TTimeInput v-model="hours" focus>{{ hours > 1 || hours === 0 ? 'Hours' : 'Hour' }}</TTimeInput>
    <span class="py-1 font-mono text-2xl">:</span>
    <TTimeInput v-model="minutes">{{
      minutes > 1 || minutes === 0 ? 'Minutes' : 'Minute'
    }}</TTimeInput>
    <span class="py-1 font-mono text-2xl">:</span>
    <TTimeInput v-model="seconds">{{
      seconds > 1 || seconds === 0 ? 'Seconds' : 'Second'
    }}</TTimeInput>
  </div>
</template>
