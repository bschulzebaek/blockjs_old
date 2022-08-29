<template>
    <div class="game-default">
        <div class="debug-container">
            <div class="fps-container"></div>
            <div class="position-container"></div>
            <div class="cursor-container"></div>
        </div>

        <span class="crosshair center-absolute">x</span>

        <toolbar
            :key="inventoryKey"
            :inventory="inventory"
        />
    </div>
</template>

<script lang="ts">
import Toolbar from '../../components/toolbar.vue';
import { subscribe, unsubscribe } from '../../../../common/utility/event-helper';
import Events from '../../../../data/events';

export default {
    components: {
        Toolbar
    },
    props: {
        canvas: {
            required: true,
            type: HTMLElement,
        },
        inventory: {
            required: false,
            type: Object
        }
    },
    data() {
        return {
            inventoryKey: 1
        }
    },
    mounted() {
        this.$stateMachine.game_resume(this.canvas);

        subscribe(Events.INVENTORY_UPDATE, this.onInventoryUpdate);
    },
    beforeUnmount() {
        this.$stateMachine.game_pause(this.canvas);

        unsubscribe(Events.INVENTORY_UPDATE, this.onInventoryUpdate);
    },
    methods: {
        onInventoryUpdate() {
            this.inventoryKey *= -1;
        }
    }
};
</script>