<script setup>
import { ref } from 'vue';
import { useBookmarks } from '../../composables/useBookmarks';

import draggable from 'vuedraggable';

import TBookmark from '../TBookmark.vue';
import TCloseButton from '../TCloseButton.vue';
import TIcon from '../TIcon.vue';

const bookmarks = useBookmarks();
const isOpen = ref(false);
const isDrag = ref(false);
const triangleOffset = ref(-100);

function onMenuOpen(e) {
  isOpen.value = true;

  const { offsetLeft, clientWidth } = e.target.closest('button');
  triangleOffset.value = offsetLeft + clientWidth / 2;
}
function onMenuClose() {
  isOpen.value = false;
  triangleOffset.value = -100;
}
function onRemove() {
  console.log('REMOVE!');
}
</script>

<template>
  <div class="flex flex-row flex-wrap ml-3 mr-6">
    <draggable
      v-model="bookmarks"
      group="people"
      @start="isDrag = true"
      @end="isDrag = false"
      item-key="name"
      class="flex flex-row flex-wrap"
    >
      <template #item="{ element }">
        <div class="cursor-pointer">
          <t-close-button floating @click="onRemove">
            <template #default>
              <t-bookmark :name="element.name" element="div" class="bookmark">
                <template #icon><img :src="element.favicon" /></template>
              </t-bookmark>
            </template>
          </t-close-button>
        </div>
      </template>
    </draggable>

    <div>
      <t-bookmark name="Add" element="button" @click="onMenuOpen">
        <template #icon><t-icon icon="plus-square" /></template>
      </t-bookmark>
    </div>
  </div>

  <div class="relative collapse" :class="{ 'collapse-open': isOpen }">
    <div class="triangle" :style="{ left: `${triangleOffset}px` }"></div>
    <div class="p-0 mt-3 collapse-content">
      <div class="relative p-6 pt-5 mx-4 rounded-lg bg-base-200">
        <t-close-button @click="onMenuClose" />

        <div class="w-full form-control">
          <label class="label">
            <span class="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Website title"
            class="w-full h-10 input input-bordered"
          />
        </div>
        <div class="w-full form-control">
          <label class="label">
            <span class="label-text">URL</span>
          </label>
          <input
            type="text"
            placeholder="Website address"
            class="w-full h-10 input input-bordered"
          />
        </div>
        <button class="w-full h-10 p-0 mt-2 min-h-min btn btn-gradient">
          <span class="z-30">Add Bookmark</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.collapse-open {
  @apply mt-3;
  @apply mb-12;
}
.triangle {
  @apply absolute;
  @apply h-3;
  @apply w-6;
  @apply top-0;
  @apply -translate-x-1/2;
}
.triangle::before {
  content: '';
  @apply absolute;
  @apply left-0;
  @apply -top-3;
  @apply w-0;
  @apply h-0;
  border: 0.75rem solid transparent;
  @apply border-b-base-200;
  /* border-bottom-color: #f90; */
}

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
</style>
