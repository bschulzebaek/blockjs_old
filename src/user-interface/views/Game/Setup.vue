<template>
    <div class="center-absolute">
        Loading ...
    </div>
</template>

<script lang="ts">
export default {
    props: {
        canvas: {
            required: true,
            type: HTMLElement,
        },
    },
    mounted() {
        this.$stateMachine.on_Setup(this.canvas);
    },
}
</script>