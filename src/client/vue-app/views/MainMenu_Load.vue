<template>
    <mc-background />

    <div class="menu-grid">
        <h1>Load Game</h1>

        <div
            v-if="isLoading"
            class="row"
        >
            Loading saved worlds...
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"/></svg>
            </button>
        </div>

        <div class="row">
            <mc-button @click="$router.go(-1)">Back</mc-button>
        </div>
    </div>
</template>

<script lang="ts">
import StorageAdapter from '../../../framework/storage/StorageAdapter';
import { Views } from '../router/routes';

export default {
    data() {
        return {
            isLoading: false,
            saves: []
        }
    },
    created() {
        this.getAllSaves();
    },
    methods: {
        async getAllSaves() {
            const dbs = (await indexedDB.databases()).filter((db) => {
                return db.name !== 'firebaseLocalStorageDb';
            });

            const settled = await Promise.allSettled(dbs.map((db) => {
                return this.loadSaveConfig(db.name);
            }));

            const successful = settled.map((save) => {
                if (save.status === 'fulfilled') {
                    return save.value;
                }
            });

            this.saves = successful.filter((save) => !!save);
            this.isLoading = false;
        },
        onClickLoadEntry(id) {
            this.$router.push({ name: Views.GAME_SETUP, query: { id } })
        },
        async onClickDeleteEntry(index, id) {
            if (this.isLoading) {
                return;
            }

            try {
                this.isLoading = true;

                setTimeout(() => {
                    const request = indexedDB.deleteDatabase(id);
                    request.onsuccess = this.getAllSaves;
                });
            } finally {

            }
        },
        loadSaveConfig(dbName) {
            return new Promise((resolve, reject) => {
                try {
                    new StorageAdapter(dbName as string).readAll('config').then((config) => {
                        resolve(config[0]);
                    });
                } catch {
                    reject();
                }
            });
        }
    }
}
</script>

<style scoped>
.menu-grid {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.menu-grid .row:last-child {
    margin-top: 2rem;
}

.game-load {
    border: 1px solid #fff;
    border-radius: 2px;
    padding: 1rem 1.25rem;
    cursor: pointer;
    background-color: rgba(0, 0, 0, .3);

    transition: all .15s ease;
}

.game-load:hover {
    transform: translate(0, 2px);
    background-color: rgba(0, 0, 0, .5);
}

.game-delete:hover {
    transform: translate(2px);
    color: darkred;
}

.game-delete {
    border: 1px solid #fff;
    border-radius: 2px;
    width: 1.25rem;
    position: relative;
    padding: 1rem 1.25rem;
    cursor: pointer;
    transition: all .15s ease;
}

.game-delete > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    fill: currentColor;
    height: 1.25rem;
    width: 1.25rem;
}
</style>