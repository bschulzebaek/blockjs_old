<template>
    <div ref="game">
        <canvas ref="canvas"></canvas>

        <router-view
            v-if="canvas"
            :canvas="canvas"
            :inventory="$store.inventory"
        ></router-view>
    </div>
</template>

<script lang="ts">
export default {
    inject: ['$store'],
    data() {
        return {
            canvas: null
        }
    },
    mounted() {
        this.canvas = this.$refs.canvas;
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