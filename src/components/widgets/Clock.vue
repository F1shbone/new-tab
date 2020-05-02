<template>
  <div class="clock">
    {{ this.formatted }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      interval: 1000,
      time: Date.now(),
    };
  },
  computed: {
    formatted() {
      return this.$d(this.time, 'time');
    },
  },
  methods: {
    registerClock() {
      this.id = setInterval(() => {
        this.time += this.interval;
      }, this.interval);
    },
    stopClock() {
      clearInterval(this.id);
    },
    restartClock() {
      this.stopClock();
      this.registerClock();
    },
  },
  mounted() {
    this.registerClock();
    window.addEventListener('focus', this.restartClock);
  },
  beforeDestroy() {
    this.stopClock();
    window.removeEventListener('focus', this.restartClock);
  },
};
</script>

<style lang="scss" scoped>
.clock {
  font-size: 4.875rem;
  font-weight: 300;
  text-align: center;
}
</style>
