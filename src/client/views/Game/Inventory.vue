<template>
    <div>
        <div class="backdrop"></div>
        <div
            v-if="inventory"
            class="inventory"
        >
            <div class="label">Inventory</div>

            <div class="crafting-area">

            </div>

            <div class="item-grid">
                <item-slot
                    v-for="(item, index) in inventory.slots.slice(9)"
                    :item="item"
                    :draggable="!!item"
                    @dragstart="onDragStart(index + 9)"
                    @dragend="onDragEnd"
                    @dragover="onDragOver"
                    @drop="onDrop(index + 9)"
                >
                    {{ index + 9 }}
                </item-slot>
            </div>

            <div class="item-toolbar">
                <item-slot
                    v-for="(item, index) in inventory.slots.slice(0, 9)"
                    :item="item"
                    :draggable="!!item"
                    @dragstart="onDragStart(index)"
                    @dragend="onDragEnd"
                    @dragover="onDragOver"
                    @drop="onDrop(index)"
                >
                    {{ index }}
                </item-slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            draggedItem: -1,
        }
    },
    props: {
        inventory: {
            required: true,
            type: Object
        }
    },
    methods: {
        getItem(index: number) {
            return this.inventory.slots[index - 1];
        },
        onDragStart(position: number) {
            this.draggedItem = position;
        },
        onDragEnd(event: DragEvent) {
            event.preventDefault();
            this.draggedItem = -1;
        },
        onDragOver(event: DragEvent) {
            event.preventDefault();
        },
        onDrop(dropTarget: number) {
            this.moveItem(this.draggedItem, dropTarget);
        },
        moveItem(from: number, to: number) {
            this.inventory.setItemPosition(from, to);
            this.draggedItem = -1;
        }
    }
};
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

.inventory {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 8px solid #ccc;
    background: #999;
    border-radius: 3px;
}
.crafting-area {
    background: #ccc;
    height: 300px;
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

.label {
    background: #ccc;
    padding: 0.25rem;
}
</style>