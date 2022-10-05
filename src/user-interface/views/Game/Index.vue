<template>
    <div ref="game">
        <canvas ref="canvas"></canvas>

        <router-view
            v-if="$store.canvas"
            :key="$store.key"
        ></router-view>
    </div>
</template>

<script lang="ts">
export default {
    inject: ['$store'],
    mounted() {
        this.$store.canvas = this.$refs.canvas;

        this.$router.push({ name: 'game-setup' });
    },
}
</script>

<style scoped>
canvas {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    width: 100vw;
    height: 100vh;
}
</style>