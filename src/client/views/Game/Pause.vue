<template>
    <div class="pause-menu">
        <div class="backdrop"></div>
        <div class="menu-grid">
            <h1>Pause</h1>

            <div class="row">
                <mc-button @click="onClickQuit">Quit to Main Menu</mc-button>
            </div>

            <div class="row">
                <mc-button @click="onClickResume">Resume</mc-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Views } from '../../router/routes';
import Fullscreen from '../../../common/utility/Fullscreen';

export default {
    methods: {
        onClickResume() {
            Fullscreen.enter();

            this.$router.push({ name: Views.GAME_DEFAULT });
        },
        onClickQuit() {
            this.$router.push({ name: Views.GAME_TEARDOWN });
        },
    }
}
</script>

<style scoped>
.backdrop {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, .3);
    pointer-events: none;
}

.menu-grid {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 423px;
    width: 100%;
}

.row:last-child {
    margin-top: 2rem;
}
</style>