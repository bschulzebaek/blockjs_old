<template>
    <button
        class="mc-button"
        tabindex="-1"
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