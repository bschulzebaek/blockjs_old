<template>
    <div>
        <div class="backdrop"></div>

        <div class="ui-container center-absolute">
            <div class="chest" v-if="chestInventory">
                <div class="label">Chest</div>
                <div class="item-grid">
                    <item-slot
                        v-for="(item, index) in chestInventory.slots"
                        :item="item"
                        :draggable="!!item"
                        @dragstart="onDragStart(index, chestInventory)"
                        @dragend="onDragEnd"
                        @dragover="onDragOver"
                        @drop="onDrop(index, chestInventory)"
                    >
                        {{ index }}
                    </item-slot>
                </div>
            </div>


            <div class="inventory" v-if="inventory">
                <div class="label">Inventory</div>
                <div class="item-grid">
                    <item-slot
                        v-for="(item, index) in inventory.slots.slice(9)"
                        :item="item"
                        :draggable="!!item"
                        @dragstart="onDragStart(index + 9, inventory)"
                        @dragend="onDragEnd"
                        @dragover="onDragOver"
                        @drop="onDrop(index + 9, inventory)"
                    >
                        {{ index + 9 }}
                    </item-slot>
                </div>

                <div class="item-toolbar">
                    <item-slot
                        v-for="(item, index) in inventory.slots.slice(0, 9)"
                        :item="item"
                        :draggable="!!item"
                        @dragstart="onDragStart(index, inventory)"
                        @dragend="onDragEnd"
                        @dragover="onDragOver"
                        @drop="onDrop(index, inventory)"
                    >
                        {{ index }}
                    </item-slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    inject: ['$store', '$container'],
    data() {
        return {
            chestInventory: null,
            fromIndex: -1,
            toIndex: -1,
            fromInv: null,
            toInv: null,
        }
    },
    computed: {
        inventory() {
            return this.$store.inventory;
        }
    },
    async mounted() {
        const { id } = this.$router.currentRoute.value.params;

        this.chestInventory = await this.$container.getInventoryService().getOrLoadInventory(id);
    },
    async beforeUpdate() {
        const { id } = this.$router.currentRoute.value.params;

        this.chestInventory = await this.$container.getInventoryService().loadInventory(id);
    },
    methods: {
        onDragStart(index: number, inventory) {
            this.fromIndex = index;
            this.fromInv = inventory;
        },
        onDragEnd(event: DragEvent) {
            event.preventDefault();
        },
        onDragOver(event: DragEvent) {
            event.preventDefault();
        },
        onDrop(index: number, inventory) {
            this.toInv = inventory;
            this.toIndex = index;

            this.moveItem();
            this.reset();
        },
        reset() {
            this.toIndex = -1;
            this.fromIndex = -1;
            this.toInv = null;
            this.fromInv = null;
        },
        moveItem() {
            const fromItem = this.fromInv.getItem(this.fromIndex),
                  toItem   = this.toInv.getItem(this.toIndex);

            this.toInv.setSlot(this.toIndex, fromItem);
            this.fromInv.setSlot(this.fromIndex, toItem);
        },
    }
};
</script>

<style scoped>

.ui-container {
    border: 8px solid #ccc;
    background: #999;
    border-radius: 3px;
}

.label {
    background: #ccc;
    padding: 0.25rem;
}

.inventory {
    border-top: 8px solid #ccc;
}

.item-grid,
.item-toolbar {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
}

.item-grid > *,
.item-toolbar > * {
    border-color: #ccc;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, .5);
}

.item-toolbar {
    border-top: 8px solid #ccc;
}
</style>