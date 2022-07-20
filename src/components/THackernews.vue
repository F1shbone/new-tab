<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
import { useAsync } from '../composables/useAsync';
import TWidget from './TWidget.vue';

const props = defineProps({
  isExpanded: {
    type: Boolean,
    required: true,
  },
});
defineEmits(['toggleExpand']);

const { data, isLoading, isFinished, error, execute } = useAsync(() => {
  return axios
    .get('https://hacker-news.firebaseio.com/v0/topstories.json')
    .then(({ data }) => {
      console.log('data!');
      return data.filter((e) => !e.deleted && !e.dead).splice(0, 20);
    })
    .then((ids) => {
      return Promise.all(
        ids.map((id) =>
          axios
            .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then(({ data }) => data)
        )
      );
    });
});

onMounted(() => {
  if (props.isExpanded.value) execute();
});
</script>

<template>
  <t-widget
    title="Hackernews"
    :is-loading="isLoading"
    :is-expanded="isExpanded"
    @refresh="execute"
    @toggle-expand="$emit('toggleExpand')"
  >
    <template #default>
      <a
        class="block transition-colors hover:bg-base-300"
        v-for="item in data"
        :key="item.id"
        :href="`https://news.ycombinator.com/item?id=${item.id}`"
        target="_blank"
      >
        <p class="text-white whitespace-nowrap text-ellipsis">
          {{ item.title }}
        </p>
        <p class="text-gray-400">
          By: {{ item.by }} | Points: {{ item.score }} | Comments:
          {{ item.kids?.length }}
        </p>
      </a>
    </template>
  </t-widget>
</template>
