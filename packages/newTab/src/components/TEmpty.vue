<script setup lang="ts">
import { RiInbox2Line } from '@remixicon/vue'
</script>

<template>
  <div class="flex flex-col items-center">
    <RiInbox2Line size="5rem" />
    <p class="mt-2 tracking-tight text-gray-600"><slot /></p>
  </div>
</template>
