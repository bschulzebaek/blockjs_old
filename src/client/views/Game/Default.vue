<template>
    <div class="game-default">
        <div class="debug-container">
            <div class="fps-container"></div>
            <div class="position-container"></div>
            <div class="cursor-container"></div>
        </div>

        <span class="crosshair center-absolute">x</span>

        <toolbar :inventory="inventory" />
    </div>
</template>

<script lang="ts">
import Toolbar from '../../components/toolbar';

export default {
    components: {
        Toolbar
    },
    props: {
        canvas: {
            required: true,
            type: HTMLElement,
        },
        inventory: {
            required: false,
            type: Object
        }
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