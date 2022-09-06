<template>
    <div class="center-absolute">
        Loading ...
    </div>
</template>

<script lang="ts">
export default {
    inject: ['$store'],
    mounted() {
        this.$stateMachine.on_Setup();
    },
}
</script>