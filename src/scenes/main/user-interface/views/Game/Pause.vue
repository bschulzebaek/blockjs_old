<template>
    <div class="pause-menu">
        <div class="backdrop"></div>
        <div class="menu-grid center-absolute center-absolute--menu">
            <h1>Pause</h1>

            <div class="row">
                <mc-button @click="$router.push({ name: 'game-teardown' })">Quit to Main Menu</mc-button>
            </div>

            <div class="row mt-4">
                <mc-button @click="onClickExit" :disabled="!isFullscreen">Exit Fullscreen</mc-button>
            </div>

            <div class="row">
                <mc-button @click="$router.push({ name: 'game-default' })">Resume</mc-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            isFullscreen: !!document.fullscreenElement
        }
    },
    created() {
        this.registerEventListener();
    },
    beforeUnmount() {
        this.discardEventListener();
    },
    methods: {
        registerEventListener() {
            addEventListener('fullscreenchange', this.onFullscreenChange);
        },
        discardEventListener() {
            removeEventListener('fullscreenchange', this.onFullscreenChange);
        },
        onFullscreenChange() {
            this.isFullscreen = !!document.fullscreenElement;
        },
        onClickExit() {
            if (!this.isFullscreen) {
                return;
            }

            document.exitFullscreen();
        }
    }
}
</script>