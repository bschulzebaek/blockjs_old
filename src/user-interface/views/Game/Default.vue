<template>
    <div class="game-default">
        <span class="crosshair center-absolute">x</span>

        <toolbar
            :key="inventoryKey"
            :inventory="inventory"
        />
    </div>
</template>

<script lang="ts">
import Toolbar from '../../components/toolbar.vue';
import { subscribe, unsubscribe } from '../../../shared/utility/event-helper';
import Events from '../../../data/events';

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
        subscribe(Events.INVENTORY_UPDATE, this.onInventoryUpdate);
    },
    beforeUnmount() {
        unsubscribe(Events.INVENTORY_UPDATE, this.onInventoryUpdate);
    },
    methods: {
        onInventoryUpdate() {
            this.inventoryKey *= -1;
        }
    }
};
</script>