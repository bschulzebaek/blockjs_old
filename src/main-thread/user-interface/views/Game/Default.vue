<template>
    <div class="game-default">
        <span class="crosshair center-absolute">x</span>

        <toolbar />
    </div>
</template>

<script lang="ts">
import Toolbar from '../../components/toolbar.vue';
export default {
    components: {
        Toolbar
    },
};
</script>