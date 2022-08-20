<template>
    <div class="loading">
        Loading ...
    </div>
</template>

<script lang="ts">
import { Views } from '../router/routes';

export default {
    mounted() {
        this.setupGame();
    },
    methods: {
        async setupGame() {
            await this.$container.setup(this.$router.currentRoute.value.query);

            this.$router.push({ name: Views.GAME_DEFAULT });
        }
    }
}
</script>

<style scoped>
.loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>