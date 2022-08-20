<template>
    <button
        tabindex="-1"
        @click="onClick"
    >
        <div>
            <slot></slot>
        </div>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    methods: {
        onClick(event: MouseEvent) {
            event.stopPropagation();
        }
    }
})
</script>

<style scoped>
button {
	height: 50px;
    width: 100%;
	cursor: pointer;
	overflow: hidden;
	white-space: nowrap;
	user-select: none;
    color: #fff;
    padding: 0;
	background: #999 url('../../../assets/button_background.png') center / cover;
	image-rendering: pixelated;
	border: 2px solid #000;
    outline: none;
    font-size: 0.8em;
    letter-spacing: 2px;
    border-radius: 2px;
}
button > div {
    width: 100%;
    height: 100%;
    line-height: 50px;
    color: #DDD;
    text-shadow: 2px 2px #000A;
    box-shadow: inset -2px -4px #0006, inset 2px 2px #FFF7;
    transition: all .15s ease;
}
button > div > span {
    vertical-align: middle;
}

button:not([disabled]):active > div,
button:not([disabled]):hover > div {
    background-color: rgba(100, 100, 255, .45);
    text-shadow: 2px 2px #202013CC;
    color: #FFFFA0;
}

button[disabled] {
    opacity: .5;
    cursor: default;
}
</style>