<template>
    <div class="teardown">
        Saving ...
    </div>
</template>

<script lang="ts">
import { Views } from '../../router/routes';

export default {
    created() {
        this.teardownGame();
    },
    methods: {
        async teardownGame() {
            await this.$container.teardown();
            this.$router.push({ name: Views.MAIN_MENU })
        }
    }
}
</script>

<style scoped>
.teardown {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>