<template>
    <div ref="game">
        <canvas ref="canvas"></canvas>

        <router-view
            v-if="canvas"
            :canvas="canvas"
            :inventory="inventory"
        ></router-view>
    </div>
</template>

<script lang="ts">

export default {
    data() {
        return {
            escDown: false,
            canvas: null,
            inventory: null,
        }
    },
    mounted() {
        this.canvas = this.$refs.canvas;

        this.$stateMachine.game_play(this.canvas);
        this.getPlayerInventory();
    },
    methods: {
        getPlayerInventory() {
            this.inventory = this.$container.getService('inventory').getPlayerInventory();
        },
    }
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