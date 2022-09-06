<template>
    <div class="main-menu-load">
        <mc-background />

        <div class="menu-grid center-absolute center-absolute--menu">
            <h1>Load Game</h1>

            <div
                v-if="isLoading"
                class="row center-text"
            >
                <p class="center-text">
                    Loading saved worlds...
                </p>
            </div>
            <div
                v-else-if="!saves.length"
                class="row"
            >
                <p class="center-text">
                    No worlds found.
                </p>
            </div>
            <div
                v-else
                v-for="(save, index) in saves"
                :key="index"
                class="row"
            >
                <div
                    class="game-load"
                    @click="onClickLoadEntry(save.id)"
                >
                    {{ save.name }}
                </div>
                <button
                    class="game-delete"
                    @click="onClickDeleteEntry(index, save.id)"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>
                </button>
            </div>

            <div class="row mt-4">
                <mc-button @click="$router.push({ name: 'main-menu' })">Back</mc-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import loadAllSaves from '../../helper/load-all-saves';

export default {
    inject: ['$store'],
    data() {
        return {
            isLoading: false,
            saves: []
        }
    },
    mounted() {
        this.loadSaves();
    },
    methods: {
        onClickLoadEntry(id) {
            this.$store.config = {
                id,
            };

            this.$router.push({ name: 'game' });
        },
        async onClickDeleteEntry(index, id) {
            try {
                this.saves.splice(index, 1);

                indexedDB.deleteDatabase(id);
            } catch(error) {
                console.error(error);
            } finally {

            }
        },
        setSaves(saves) {
            this.saves = saves;
        },
        async loadSaves() {
            try {
                this.isLoading = true;
                this.saves = await loadAllSaves();
            } catch(error) {
                console.error(error);
            } finally {
                this.isLoading = false;
            }
        }
    }
}
</script>