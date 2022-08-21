<template>
    <div class="debug-container">
        <div class="fps-container"></div>
        <div class="position-container"></div>
        <div class="cursor-container"></div>
    </div>
    <span>x</span>
</template>

<script lang="ts">
export default {
  props: {
    canvas: {
      required: true,
      type: HTMLElement,
    },
  },
  mounted() {
    if (this.$container.isRunning()) {
      return;
    }

    this.$container.resume(this.canvas);
  },
  beforeUnmount() {
    this.$container.pause();
  },
};
</script>

<style scoped>
.debug-container {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.5rem;
}

span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.5rem;
}
</style>
