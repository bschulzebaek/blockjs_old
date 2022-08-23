<template>
    <mc-background />

    <div class="menu-grid">
        <h1>Create World</h1>

        <div class="row">
            <input
                type="text"
                placeholder="New World"
                v-model="name"
                name="World"
                maxlength="16"
            >
        </div>

        <div class="row">
            <input
                type="text"
                placeholder="World seed"
                v-model="seed"
                name="Seed"
                maxlength="16"
            >
        </div>

        <div class="row">
            <mc-button @click="$router.go(-1)">Back</mc-button>
            <mc-button @click="onClickConfirm">Confirm</mc-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Views } from '../../router/routes';

export default {
    data() {
        return {
            name: 'New World',
            seed: ''
        }
    },
    methods: {
        onClickConfirm() {
            const { name, seed } = this;

            this.$router.push({ name: Views.GAME_SETUP, query: { name, seed } })
        },
    }
}
</script>

<style scoped>
.menu-grid {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 423px;
    width: 100%;
}
</style>