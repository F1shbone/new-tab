<script setup>
import { ref, computed } from 'vue';
import { useBookmarks } from '../../composables/useBookmarks';
import { useRemoteFavicon } from '../../composables/useRemoteFavicon';

import draggable from 'vuedraggable';
import TCloseButton from '../TCloseButton.vue';
import TIcon from '../TIcon.vue';

const bookmarks = useBookmarks();

// Draggable
const dragOptions = ref({
  animation: 200,
  group: 'bookmarks',
  disabled: false,
  ghostClass: 'ghost',
});
const isDrag = ref(false);

// New Bookmark Dialog
const urlPrefix = 'https://';
const name = ref('');
const url = ref('');
const index = computed(() =>
  bookmarks.value.findIndex((e) => e.name === name.value)
);
const btnLabel = computed(() => (index.value === -1 ? 'Add' : 'Edit'));

function onAdd() {
  if (name.value === '' || url.value === '') return;

  const { favicon, execute } = useRemoteFavicon(urlPrefix + url.value);

  execute().then(() => {
    const bookmark = {
      name: name.value,
      url: urlPrefix + url.value,
      favicon: favicon.value,
    };

    if (index.value === -1) {
      bookmarks.value.push(bookmark);
    } else {
      bookmarks.value[index.value] = bookmark;
    }

    name.value = '';
    url.value = '';
  });
}
function onEdit(elem) {
  name.value = elem.name;
  url.value = elem.url.replace(urlPrefix, '');
}
function onRemove({ name }) {
  const index = bookmarks.value.findIndex((e) => e.name === name);
  bookmarks.value.splice(index, 1);
}
</script>

<template>
  <div class="ml-3 mr-6">
    <form class="p-6 pt-5 mb-2 rounded-lg bg-base-200" @submit.prevent="onAdd">
      <div class="w-full form-control">
        <label class="label">
          <span class="label-text">Name</span>
        </label>
        <input
          v-model="name"
          type="text"
          placeholder="Website title"
          class="w-full h-10 input input-bordered"
        />
      </div>
      <div class="w-full form-control">
        <label class="label">
          <span class="label-text">URL</span>
        </label>
        <label class="input-group">
          <span>{{ urlPrefix }}</span>
          <input
            v-model="url"
            type="text"
            placeholder="Website address"
            class="w-full h-10 input input-bordered"
          />
        </label>
      </div>
      <button
        class="w-full h-10 p-0 mt-2 min-h-min btn btn-gradient"
        role="submit"
      >
        <span class="z-30">{{ btnLabel }} Bookmark</span>
      </button>
    </form>

    <h1 class="pt-6 pb-4 text-3xl font-bold text-white">Bookmarks</h1>

    <draggable
      v-model="bookmarks"
      v-bind="dragOptions"
      :component-data="{
        tag: 'ul',
        type: 'transition-group',
        name: !isDrag ? 'flip-list' : null,
      }"
      item-key="name"
      @start="isDrag = true"
      @end="isDrag = false"
    >
      <template #item="{ element }">
        <li
          class="relative flex items-center mb-2 rounded-lg cursor-pointer bg-base-200"
        >
          <img class="m-2 rounded-lg w-11 h-11" :src="element.favicon" />
          <div class="flex items-center p-2 grow">
            <div class="mx-4 grow">
              <span class="block">{{ element.name }}</span>
              <span class="block text-sm text-blue-500">{{ element.url }}</span>
            </div>

            <button
              class="text-lg font-normal btn btn-sm btn-circle handle"
              @click="onEdit(element)"
            >
              <t-icon icon="pencil" />
            </button>
            <t-close-button static class="ml-2" @click="onRemove(element)" />
          </div>
        </li>
      </template>
    </draggable>
  </div>
</template>

<style scoped>
.btn-gradient {
  @apply relative;
  @apply text-white;
}
.btn-gradient::before {
  content: '';
  @apply absolute;
  @apply top-px;
  @apply left-px;
  @apply right-px;
  @apply bottom-px;
  @apply rounded-lg;
  @apply z-20;
  @apply bg-base-100;
  @apply transition-opacity;
}
.btn-gradient::after {
  content: '';
  @apply absolute;
  @apply top-0;
  @apply left-0;
  @apply right-0;
  @apply bottom-0;
  @apply rounded-lg;
  @apply z-10;
  background: var(--gradient);
}
.btn-gradient:hover::before {
  @apply opacity-0;
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  @apply opacity-50;
  @apply bg-base-300;
}
</style>
