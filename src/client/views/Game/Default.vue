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
import Toolbar from '../../components/toolbar.vue';

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
        this.$stateMachine.game_resume(this.canvas);
    },
    beforeUnmount() {
        this.$stateMachine.game_pause(this.canvas);
    },
};
</script>