<template>
    <div class="center-absolute">
        Loading ...
    </div>
</template>

<script lang="ts">
import { createInstance } from '../../../engine';
import Fullscreen from '../../../shared/utility/Fullscreen';

export default {
    props: {
        canvas: {
            required: true,
            type: HTMLElement,
        },
    },
    mounted() {
        Fullscreen.enter();

        createInstance(this.canvas, this.$router.currentRoute.value.query);
        // this.$stateMachine.GameSetup_GameDefault();
    },
}
</script>