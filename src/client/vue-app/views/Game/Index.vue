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
import Fullscreen from '../../../../utility/Fullscreen';
import { Views } from '../../router/routes';
import Inventory from '../../../../framework/inventory/Inventory';

export default {
    data() {
        return {
            escDown: false,
            canvas: null,
            inventory: null,
        }
    },
    mounted() {
        this.registerEventListener();

        this.canvas = this.$refs.canvas;

        Fullscreen.enter();

        this.$container.play(this.canvas);
        this.getPlayerInventory();
    },
    beforeUnmount() {
        this.discardEventListener();
    },
    methods: {
        registerEventListener() {
            window.addEventListener('fullscreenchange', this.onFullscreenChange);
            window.addEventListener('keydown', this.onKeyDown);
            window.addEventListener('keyup', this.onKeyUp);
            window.addEventListener('blur', this.onTabBlur);
            window.addEventListener(Inventory.EVENT_UPDATE, this.onInventoryUpdate);
        },
        discardEventListener() {
            window.removeEventListener('fullscreenchange', this.onFullscreenChange);
            window.removeEventListener('keydown', this.onKeyDown);
            window.removeEventListener('keyup', this.onKeyUp);
            window.removeEventListener('blur', this.onTabBlur);
            window.removeEventListener(Inventory.EVENT_UPDATE, this.onInventoryUpdate);
        },
        onFullscreenChange() {
            if (!document.fullscreenElement) {
                navigator.keyboard?.unlock(['Escape']);
            } else {
                navigator.keyboard?.lock(['Escape']);
            }
        },
        pauseGame() {
            this.$router.push({ name: Views.GAME_PAUSE });
        },
        onKeyDown(event: KeyboardEvent) {
            if (event.code !== 'Escape' || this.escDown || !document.fullscreenElement) {
                return;
            }

            this.escDown = true;

            if (this.$router.currentRoute._value.name === Views.GAME_PAUSE) {
                this.$router.go(-1);
            } else {
                this.$router.push({ name: Views.GAME_PAUSE });
            }
        },
        onKeyUp(event: KeyboardEvent) {
            if (event.code !== 'Escape') {
                return;
            }

            this.escDown = false;
        },
        onTabBlur() {
            if (this.$router.currentRoute._value.name !== Views.GAME_DEFAULT) {
                return;
            }

            this.$router.push({ name: Views.GAME_PAUSE });
        },
        getPlayerInventory() {
            this.inventory = this.$container.getService('inventory').getInventory(
                this.$container.getService('entity').getPlayer().getInventoryId()
            );
        },
        onInventoryUpdate(event) {
            this.inventory = event.detail;
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
    z-index: 0;
    width: 100vw;
    height: 100vh;
}
</style>