<template>
    <button
        class="mc-button"
        @click="onClick"
    >
        <div>
            <slot></slot>
        </div>
    </button>
</template>

<script>
export default {
    methods: {
        onClick(event) {
            event.stopPropagation();
        }
    }
}
</script>