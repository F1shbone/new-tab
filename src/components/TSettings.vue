<script setup>
import { ref } from 'vue';
import TIcon from './TIcon.vue';

const active = ref('VBookmarks');
const items = ref([
  {
    name: 'Background Image',
    icon: 'card-image',
    to: 'VBackgroundImage',
  },
  {
    name: 'Bookmarks',
    icon: 'bookmarks',
    to: 'VBookmarks',
  },
  {
    name: 'Clock',
    icon: 'clock',
    to: 'VClock',
  },
]);
</script>

<template>
  <div class="flex">
    <ul
      class="flex-grow flex-shrink-0 font-bold text-white basis-80 menu bg-base-100"
    >
      <li
        v-for="(item, i) in items"
        :key="i"
        :class="{ bordered: active === item.to }"
      >
        <a class="border-l-4">
          <t-icon :icon="item.icon" class="mr-4 text-lg" />
          {{ item.name }}
        </a>
      </li>
    </ul>
    <div class="py-3 ml-3 mr-6">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam fugiat
        neque voluptates quasi accusamus, a unde porro iste, tempora earum
        explicabo similique quod quisquam libero labore sequi, eum in tenetur?
      </p>
    </div>
  </div>
</template>

<style scoped>
.menu :where(:not(li.bordered > *)) {
  @apply border-transparent;
}
.menu li.bordered a {
  color: hsl(var(--p) / var(--tw-border-opacity));
}
.menu li.bordered svg {
  @apply text-white;
}
</style>
