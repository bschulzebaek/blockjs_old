<template>
    <div class="toolbar">
        <div class="toolbar-quickslots">
            <item-slot
                v-for="i in 9"
                :item="getItem(i)"
                :active="i - 1 === selected"
            ></item-slot>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            selected: this.inventory.activeIndex,
        }
    },
    props: {
        inventory: {
            required: false,
            type: Object
        }
    },
    mounted() {
        window.addEventListener('wheel', this.onScroll);
    },
    beforeUnmount() {
        window.removeEventListener('wheel', this.onScroll);
    },
    methods: {
        getItem(index: number) {
            return this.inventory.slots[index - 1];
        },
        onScroll(event: WheelEvent) {
            const { deltaY } = event;

            if (deltaY > 0) {
                this.selected++;
                if (this.selected >= 9) {
                    this.selected = 0;
                }
            } else {
                this.selected--;
                if (this.selected < 0) {
                    this.selected = 8;
                }
            }

            this.inventory.setActiveIndex(this.selected);
        }
    }
};
</script>

<style scoped>

.toolbar {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
}

.toolbar-quickslots {
    background: rgba(0, 0, 0, .5);
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    /* outline: 5px solid #000; */
    border: 3px solid #929292;
    box-shadow: 0 1px 5px rgba(0, 0, 0, .5);
}

.toolbar-quickslots .item-slot {
    border-width: 2px;
    border-radius: 2px;
}


/* .toolbar .inventory-bar {
    position: absolute;
    left: 50%;
    bottom: 5px;
    border-radius: 3px;
} */
</style>