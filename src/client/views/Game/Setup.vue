<template>
    <div class="center-absolute">
        Loading ...
    </div>
</template>

<script lang="ts">
export default {
    mounted() {
        this.setupGame();
    },
    methods: {
        async setupGame() {
            await this.$container.setup(this.$router.currentRoute.value.query);

            this.$stateMachine.to_GameDefault();
        }
    }
}
</script>