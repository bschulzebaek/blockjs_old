<template>
    <mc-background />

    <div class="menu-grid center-absolute center-absolute--menu">
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

        <div class="row mt-4">
            <mc-button @click="$router.push({ name: 'main-menu' })">Back</mc-button>
            <mc-button @click="onClickConfirm">Confirm</mc-button>
        </div>
    </div>
</template>

<script lang="ts">
import generateSeed from '../../../../../shared/utility/generate-seed';

export default {
    inject: ['$store'],
    data() {
        return {
            name: 'New World',
            seed: generateSeed(),
        }
    },
    methods: {
        onClickConfirm() {
            const { name, seed } = this;

            this.$store.config = {
                name,
                seed,
                isNew: true
            };

            this.$router.push({ name: 'game' });
        },
        generateNewSeed() {
            this.seed = generateSeed();
        }
    }
}
</script>