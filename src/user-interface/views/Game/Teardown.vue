<template>
    <div class="center-absolute">
        Saving ...
    </div>
</template>

<script lang="ts">
import { discardInstance } from '../../../engine';

export default {
    created() {
        this.teardownGame();
    },
    methods: {
        async teardownGame() {
            await discardInstance();
            // await this.$container.teardown();
            //
            // this.$stateMachine.to_MainMenu();
            this.$router.push({ name: 'main-menu' })
        }
    }
}
</script>