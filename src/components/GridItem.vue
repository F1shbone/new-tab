<template functional>
  <div
    :class="{
      grid__item: true,
      'grid__item--left': left,
      grid__item__right: right,
    }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    left: {
      type: Boolean,
      default: false,
    },
    right: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.grid__item {
  &--left {
    grid-column: 1 / span 2;
  }
  &--right {
    justify-self: center;
    grid-column: 3 / auto;
  }
}
</style>
