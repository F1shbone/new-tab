<template>
  <div class="inline-block text-center">
    <div class="inline-block w-20 h-20">
      <div
        class="grid w-12 mt-1 ml-4 border-2 border-black border-solid t-loader aspect-square box-border rounded-[50%]"
      />
    </div>
    <p class="mt-2 tracking-tight text-gray-600">Loading</p>
  </div>
</template>

<style>
.t-loader {
  animation: l11 1.5s infinite linear;
  transform-origin: 50% 80%;
}
.t-loader:before,
.t-loader:after {
  content: '';
  grid-area: 1/1;
  border: inherit;
  border-radius: 50%;
  animation: inherit;
  animation-duration: 1s;
  transform-origin: inherit;
}
.t-loader:after {
  --s: -1;
}
@keyframes l11 {
  100% {
    transform: rotate(calc(var(--s, 1) * 1turn));
  }
}
</style>
