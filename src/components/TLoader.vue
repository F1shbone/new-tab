<template>
  <div
    class="absolute top-0 bottom-0 left-0 right-0 transition-all bg-black/50"
  >
    <div class="spinner"></div>
  </div>
</template>

<style>
@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
.spinner:before {
  content: '';
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2rem;
  height: 2rem;
  margin-top: -1rem;
  margin-left: -1rem;
  border-radius: 50%;
  border: 2px solid #ea580c;
  border-top-color: #000;
  animation: spinner 0.8s linear infinite;
}
</style>
