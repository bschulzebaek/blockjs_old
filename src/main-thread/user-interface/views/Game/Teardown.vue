<template>
    <div class="center-absolute">
        Saving ...
    </div>
</template>

<script lang="ts">
export default {
    mounted() {
        this.$stateMachine.on_Teardown();
    },
}
</script>