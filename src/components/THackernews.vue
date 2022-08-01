<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useAsync } from '../composables/useAsync';

import TWidget from './TWidget.vue';
import TModal from './TModal.vue';

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

// const preview = ref(undefined);

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
        class="block w-full text-left transition-colors select-none bg-base-200 hover:bg-base-300"
        v-for="item in data"
        :key="item.id"
        :href="`https://news.ycombinator.com/item?id=${item.id}`"
        target="_blank"
      >
        <!-- @click="preview = `https://news.ycombinator.com/item?id=${item.id}`" -->
        <p class="overflow-hidden text-white whitespace-nowrap text-ellipsis">
          {{ item.title }}
        </p>
        <p class="text-gray-400">
          By: {{ item.by }} | Points: {{ item.score }} | Comments:
          {{ item.kids?.length }}
        </p>
      </a>
    </template>
  </t-widget>
  <!-- <t-modal :is-open="preview !== undefined" @close="preview = undefined">
    <template #content>
      <iframe
        src="https://financial.com"
        class="w-[48rem] h-[54rem] -my-10 -mx-6"
      />
    </template>
  </t-modal> -->
</template>
