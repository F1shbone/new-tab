<script setup lang="ts">
withDefaults(
  defineProps<{
    hover?: boolean
    tight?: boolean
    flush?: boolean
    reverse?: boolean
    labelClass?: string
  }>(),
  {
    hover: false,
    tight: false,
    flush: false,
    labelClass: '',
  },
)
const model = defineModel<boolean>({
  required: true,
})
</script>

<template>
  <label
    class="flex items-center cursor-pointer"
    :class="{
      'gap-3': !tight,
      'gap-1': tight,
      ' py-2': !flush,
      'flex-row-reverse justify-end': reverse,
    }"
  >
    <input
      type="checkbox"
      class="w-6 h-6 border border-gray-400 rounded-md appearance-none cursor-pointer t-checkbox bg-none checked:bg-orange-500 checked:border-orange-500 transition-color"
      :class="{
        'hover:bg-orange-500/25': hover,
      }"
      v-model="model"
    />
    <span
      class="flex items-center justify-between cursor-pointer select-none"
      :class="{
        'p-1': !tight,
        'px-1': tight,
        [labelClass]: labelClass !== '',
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
