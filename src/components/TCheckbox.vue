<script setup lang="ts">
withDefaults(
  defineProps<{
    hover?: boolean
    tight?: boolean
  }>(),
  {
    hover: false,
    tight: false,
  },
)
const model = defineModel<boolean>({
  required: true,
})
</script>

<template>
  <label
    class="flex items-center rounded-lg cursor-pointer"
    :class="{
      'gap-3 px-3 py-2': !tight,
      'gap-1 p-1': tight,
      'transition-colors hover:bg-orange-700/25': hover,
    }"
  >
    <input
      type="checkbox"
      class="w-6 h-6 border border-gray-400 rounded-md appearance-none cursor-pointer t-checkbox bg-none checked:bg-orange-500 checked:border-orange-500 transition-color"
      v-model="model"
    />
    <span
      class="flex items-center justify-between cursor-pointer select-none"
      :class="{
        'p-1': !tight,
        'px-1': tight,
      }"
    >
      <slot />
    </span>
  </label>
</template>

<style>
.t-checkbox:checked {
  --chkbg: #f97316;
  --chkfg: #fff;
  background-image: linear-gradient(-45deg, transparent 66%, var(--chkbg) 66.99%),
    linear-gradient(45deg, transparent 77%, var(--chkbg) 77.99%),
    linear-gradient(-45deg, var(--chkbg) 41%, transparent 41.99%),
    linear-gradient(
      45deg,
      var(--chkbg) 34%,
      var(--chkfg) 34.99%,
      var(--chkfg) 40%,
      transparent 40.99%
    ),
    linear-gradient(-45deg, var(--chkfg) 47%, var(--chkbg) 47.99%);
}
</style>
