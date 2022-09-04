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

import { navigationControlKeyDown, navigationControlKeyUp } from '../../helper/InGameNavigationControl';

export default {
    data() {
        return {
            keyMap: {},
            canvas: null,
            inventory: null,
        }
    },
    mounted() {
        this.canvas = this.$refs.canvas;

        // this.$stateMachine.game_play(this.canvas);
        // this.getPlayerInventory();
        window.addEventListener('fullscreenchange', this.onFullscreenChange);
        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('keyup', this.onKeyUp);
    },
    beforeUnmount() {
        window.removeEventListener('fullscreenchange', this.onFullscreenChange);
        window.removeEventListener('keydown', this.onKeyDown);
        window.removeEventListener('keyup', this.onKeyUp);
    },
    methods: {
        getPlayerInventory() {
            // this.inventory = this.$container.getService('inventory').getPlayerInventory();
        },
        onFullscreenChange() {
            if (!document.fullscreenElement) {
                this.$router.push({ name: 'game-pause' });
            }
        },
        onKeyDown(event) {
            if (this.keyMap[event.key]) {
                return;
            }

            this.keyMap[event.key] = true;

            navigationControlKeyDown(event, this.$router);
        },
        onKeyUp(event) {
            if (!this.keyMap[event.key]) {
                return;
            }

            this.keyMap[event.key] = false;
            navigationControlKeyUp(event, this.$router);
        }
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