<template>
    <div class="main-menu-index">
        <mc-background />

        <main class="center-absolute center-absolute--menu">
            <div class="logo">
                <div class="logo__image"></div>
                <div class="logo__label">
                    Minecraft in JavaScript!
                </div>
            </div>

            <div class="menu-grid">
                <div class="row">
                    <mc-button @click="$router.push({ name: 'main-menu-new' })">New Game</mc-button>
                </div>

                <div class="row">
                    <mc-button @click="$router.push({ name: 'main-menu-load' })">Load Game</mc-button>
                </div>

                <div class="row">
                    <mc-button @click="$router.push({ name: 'main-menu-settings' })">Options</mc-button>
                </div>

                <div class="row">
                    <a
                        href="https://github.com/bschulzebaek/blockjs"
                        target="_blank"
                        tabindex="-1"
                    >
                        <mc-button>About</mc-button>
                    </a>
                    <mc-button
                        @click="onClickExit"
                        :disabled="!isFullscreen"
                    >
                        Exit Fullscreen
                    </mc-button>
                </div>
            </div>
        </main>

        <footer>
            This project is not affiliated with (or supported by) Mojang AB, Minecraft, or Microsoft in any way.<br>
            Any assets from Minecraft are used non-commercially under fair use and in accordance with
            <a
                cross-origin="anonymous"
                href="https://account.mojang.com/documents/minecraft_eula"
                target="_blank"
                rel="noopener"
                style="color: white;"
            >
                Minecraft's EULA.
            </a>
        </footer>
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