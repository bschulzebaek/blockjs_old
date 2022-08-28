<template>
    <div class="center-absolute">
        Loading ...
    </div>
</template>

<script lang="ts">
export default {
    mounted() {
        this.$stateMachine.GameSetup_GameDefault();
    },
}
</script>