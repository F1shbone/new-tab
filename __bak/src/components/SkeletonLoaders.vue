<template>
  <div
    :class="{ 'skeleton-loader': true, 'skeleton-loader--is-loading': loading }"
    :style="`width: ${width}%;`"
  >
    <div class="skeleton-loader__text skeleton-loader__bone" />
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 100,
      validator(e) {
        return e >= 0 && e <= 100;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.skeleton-loader {
  border-radius: 4px;
  position: relative;
  vertical-align: top;
  &--is-loading {
    overflow: hidden;
  }

  &__bone {
    border-radius: inherit;
    overflow: hidden;
    position: relative;
    &:after {
      background: linear-gradient(
        90deg,
        transparent,
        hsla(255, 0%, 100%, 0.3),
        transparent
      );
      animation: loading 1.5s infinite;
      content: '';
      height: 100%;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      transform: translateX(-100%);
      z-index: 1;
    }
  }

  @keyframes loading {
    100% {
      transform: translateX(100%);
    }
  }

  &__text {
    height: 12px;
    margin-bottom: 6px;
    flex: 1 0 auto;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.12);
  }
}
</style>
