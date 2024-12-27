<script setup lang="ts">
import { onMounted, onBeforeUnmount, useTemplateRef } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import trianglify from 'trianglify'

const props = withDefaults(
  defineProps<{
    width?: number
    height?: number
    fullscreen?: boolean
    cellSize?: number
  }>(),
  {
    cellSize: () => 75,
  },
)

function generateWallpaper() {
  return trianglify({
    cellSize: props.cellSize,
    width: props.fullscreen ? el.value?.parentElement?.clientWidth : props.width,
    height: props.fullscreen ? el.value?.parentElement?.clientHeight : props.height,
    seed: '112345',
    palette: {
      YlOrRd: trianglify.utils.colorbrewer.YlOrRd,
    },
    colorFunction: trianglify.colorFunctions.sparkle(0.2),
  })
}

const el = useTemplateRef('el')
const onResize = useDebounceFn(() => {
  if (el.value) {
    el.value.innerHTML = ''
    el.value.appendChild(generateWallpaper().toCanvas())
  }
})
const resizeOb = new ResizeObserver(onResize)

onMounted(() => {
  if (el.value) {
    el.value.appendChild(generateWallpaper().toCanvas())
    if (props.fullscreen) {
      resizeOb.observe(el.value)
    }
  }
})
onBeforeUnmount(() => {
  if (props.fullscreen) {
    resizeOb.disconnect()
  }
})
</script>

<template>
  <div class="w-full h-full" ref="el" />
</template>
