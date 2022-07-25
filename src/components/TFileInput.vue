<script setup>
import { ref } from 'vue';
import TIcon from './TIcon.vue';
import TLoader from './TLoader.vue';

defineProps({
  accept: {
    required: true,
    type: String,
  },
});

const emits = defineEmits(['input']);

const input = ref(undefined);
const isLoading = ref(false);

function onClick() {
  input.value.click();
}
function onInput() {
  isLoading.value = true;
  const file = input.value.files[0];
  const reader = new FileReader();
  reader.onload = (result) => {
    isLoading.value = false;
    emits('input', {
      name: file.name,
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate,
      size: file.size,
      type: file.type,
      dataURL: result.target.result,
    });
  };
  reader.readAsDataURL(file);
}
</script>

<template>
  <div>
    <input
      type="file"
      class="hidden"
      ref="input"
      :accept="accept"
      @input="onInput"
    />
    <button
      @click="onClick"
      class="relative flex flex-col items-center p-3 transition-colors w-42 rounded-xl hover:bg-base-200"
    >
      <div
        class="flex flex-col items-center justify-center p-6 pb-3 border-2 border-gray-500 w-36 h-36 rounded-xl"
      >
        <t-icon icon="upload" class="w-16 h-16" />
        <span class="mt-3 text-xs">Upload from device</span>
      </div>
      <span class="mt-3">Use your own</span>
      <t-loader v-show="isLoading" class="rounded-xl" />
    </button>
  </div>
</template>
