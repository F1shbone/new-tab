<template>
  <div class="wallpaper__container">
    <div class="wallpaper__image" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.wallpaper {
  &__container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }

  &__image {
    max-width: 100%;
    max-height: 100%;
    height: 100vh;
    background-image: url("~@/assets/Wallpaper.png");
    background-size: cover;
    background-position: center;
  }
}
</style>
