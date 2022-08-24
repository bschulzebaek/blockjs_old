<template>
    <div class="center-absolute">
        Saving ...
    </div>
</template>

<script lang="ts">
export default {
    created() {
        this.teardownGame();
    },
    methods: {
        async teardownGame() {
            await this.$container.teardown();

            this.$stateMachine.to_MainMenu();
        }
    }
}
</script>