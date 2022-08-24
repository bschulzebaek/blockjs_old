<template>
    <div class="main-menu-index">
        <mc-background />

        <main class="center-absolute center-absolute--menu">
            <div class="logo">
                <img
                    :src="$getAssetUrl('logo.png')"
                    alt=""
                    draggable="false"
                    class="logo__image"
                >
                <div class="logo__label">
                    Minecraft in JavaScript!
                </div>
            </div>

            <div class="menu-grid">
                <div class="row">
                    <mc-button @click="$stateMachine.to_MainMenuNew">New Game</mc-button>
                </div>

                <div class="row">
                    <mc-button @click="$stateMachine.to_MainMenuLoad">Load Game</mc-button>
                </div>

                <div class="row">
                    <mc-button @click="$stateMachine.to_MainMenuSettings">Options</mc-button>
                </div>

                <div class="row">
                    <a
                        href="https://github.com/bschulzebaek/blockjs"
                        target="_blank"
                    >
                        <mc-button>About</mc-button>
                    </a>
                    <mc-button
                        @click="$stateMachine.exit_Fullscreen"
                        :disabled="!isFullscreen"
                    >
                        Exit Fullscreen
                    </mc-button>
                </div>
            </div>
        </main>

        <footer>
            This project is not affiliated with (or supported by) Mojang AB, Minecraft, or Microsoft in any way.<br> Any assets from Minecraft are used non-commercially under fair use and in accordance with <a cross-origin="anonymous" href="https://account.mojang.com/documents/minecraft_eula" target="_blank" rel="noopener" style="color: white;">Minecraft's EULA.</a>
        </footer>
    </div>
</template>

<script lang="ts">
export default {
    inject: ['$getAssetUrl'],
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
            window.addEventListener('fullscreenchange', this.onFullscreenChange);
        },
        discardEventListener() {
            window.removeEventListener('fullscreenchange', this.onFullscreenChange);
        },
        onFullscreenChange() {
            this.isFullscreen = !!document.fullscreenElement;
        },
    }
}
</script>