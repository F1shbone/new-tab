<script setup>
import { onBeforeUnmount, ref } from 'vue';

const hour = ref(0);
const minute = ref(0);
const am_pm = ref('AM');

function showTime() {
  let time = new Date();
  let h = time.getHours();
  let m = time.getMinutes();

  if (h > 12) {
    h -= 12;
    am_pm.value = 'PM';
  }
  if (h == 0) {
    h = 12;
    am_pm.value = 'AM';
  }

  hour.value = h < 10 ? '0' + h : h;
  minute.value = m < 10 ? '0' + m : m;
}

const id = setInterval(showTime, 1000);
showTime();

onBeforeUnmount(() => {
  clearInterval(id);
});
</script>

<template>
  <span class="inline-block text-7xl">
    <span>{{ hour }}</span
    >:<span>{{ minute }}</span> <span>{{ am_pm }}</span>
  </span>
</template>
