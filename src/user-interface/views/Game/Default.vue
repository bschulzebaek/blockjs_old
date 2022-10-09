<template>
    <div class="game-default">
        <span class="crosshair center-absolute">x</span>

        <toolbar />

        <div class="game-default__debug">
            <div class="fps">{{ fps }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import Toolbar from '../../components/toolbar.vue';
export default {
    components: {
        Toolbar
    },
    data() {
        return {
            fps: 0,
        }
    },
    mounted() {
        window.requestAnimationFrame(this.loop.bind(this, 0));
    },
    methods: {
        loop(time: number, lastTime: number) {
            const delta = this.getDelta(time, lastTime);

            this.fps = (1 / delta).toFixed(1);

            requestAnimationFrame((newTime) => this.loop(newTime, time));
        },
        getDelta(time: number, lastTime: number) {
            return Math.min(time - lastTime, 100) / 1000;
        }
    }
};
</script>