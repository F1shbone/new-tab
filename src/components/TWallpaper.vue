<template>
  <div class="wallpaper__container">
    <div class="wallpaper__image" />
  </div>
</template>

<style scoped>
.wallpaper__container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}

.wallpaper__image {
  max-width: 100%;
  max-height: 100%;
  height: 100vh;
  background-image: url('/Wallpaper.webp');
  background-size: cover;
  background-position: center;
}
</style>
