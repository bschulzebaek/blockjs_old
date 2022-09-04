<template>
    <div class="center-absolute">
        Loading ...
    </div>
</template>

<script lang="ts">
import { createInstance } from '../../../engine';

export default {
    props: {
        canvas: {
            required: true,
            type: HTMLElement,
        },
    },
    mounted() {
        createInstance(this.canvas);
        // this.$stateMachine.GameSetup_GameDefault();
    },
}
</script>