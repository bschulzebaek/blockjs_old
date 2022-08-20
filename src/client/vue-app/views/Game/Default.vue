<template>
    <div class="fps-container">60</div>
    <span>x</span>
</template>

<script lang="ts">
export default {
    props: {
        canvas: {
            required: true,
            type: HTMLElement
        }
    },
    mounted() {
        this.canvas.requestPointerLock();
        this.$container.services.rendererService.start();
    },
    beforeUnmount() {
        this.$container.services.rendererService.stop();
        document.exitPointerLock();
    }
}
</script>

<style scoped>
.fps-container {
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