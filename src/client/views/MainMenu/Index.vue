<template>
    <mc-background></mc-background>

    <main>
        <div class="logo">
            <img
                :src="$getAssetUrl('logo.png')"
                alt=""
                draggable="false"
                class="logo-image"
            >
            <div class="logo-label">
                Minecraft in JavaScript!
            </div>
        </div>

        <div class="menu-grid">
            <div class="row">
                <router-link :to="newGameRoute">
                    <mc-button>New Game</mc-button>
                </router-link>
            </div>

            <div class="row">
                <router-link :to="loadGameRoute">
                    <mc-button>Load Game</mc-button>
                </router-link>
            </div>

            <div class="row">
                <router-link :to="settingsRoute">
                    <mc-button>Options</mc-button>
                </router-link>
            </div>

            <div class="row">
                <a
                    href="https://github.com/bschulzebaek/blockjs"
                    target="_blank"
                >
                    <mc-button>About</mc-button>
                </a>
                <mc-button
                    @click="onClickQuit"
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
</template>

<script lang="ts">
import { Paths } from '../../router/routes';
import Fullscreen from '../../../common/utility/Fullscreen';

export default {
    inject: ['$getAssetUrl'],
    data() {
        return {
            isFullscreen: !!document.fullscreenElement
        }
    },
    computed: {
        newGameRoute() {
            return Paths.MAIN_MENU_NEW;
        },
        loadGameRoute() {
            return Paths.MAIN_MENU_LOAD;
        },
        settingsRoute() {
            return Paths.MAIN_MENU_SETTINGS;
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
        onClickQuit() {
            this.exitFullscreen();
        },
        exitFullscreen() {
            Fullscreen.exit();
        },
        onFullscreenChange() {
            this.isFullscreen = !!document.fullscreenElement;
        }
    }
}

</script>

<style scoped>
main {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.menu-grid {
    margin-top: 4rem;
}

footer {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    font-size: 0.625rem;
    padding: 0.25rem 0.5rem;
}
.logo {
    position: relative;
    text-align: center;
}

.logo-label {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: rotate(-12deg) translate(25%, 0);
    font-size: 16px;
    color: rgb(248, 248, 73);
    text-shadow: 0 0 10px rgb(0 0 0);
    animation: bumpLogo 5s 5s ease-in-out infinite;
}

@keyframes bumpLogo {
    0% {
        font-size: 16px;
    }
    10% {
        font-size: 17px;
    }
    20% {
        font-size: 16px;
    }
    100% {
        font-size: 16px;
    }
}

@media only screen and (max-width: 980px) {
    .logo-image {
        max-width: 100vw;
    }
    .logo-label {
        display: none;
    }
}
</style>