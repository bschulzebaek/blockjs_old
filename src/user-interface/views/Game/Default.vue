<template>
    <div class="game-default">
        <span class="crosshair center-absolute">x</span>

<!--        <toolbar-->
<!--            :key="inventoryKey"-->
<!--            :inventory="inventory"-->
<!--        />-->
    </div>
</template>

<script lang="ts">
import Toolbar from '../../components/toolbar.vue';
import ThreadManager from '../../../engine/threads/ThreadManager';
import { BroadcastMessages } from '../../../engine/threads/ThreadMessages';
// import { subscribe, unsubscribe } from '../../../../common/utility/event-helper';
// import Events from '../../../../data/events';

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
        this.canvas.requestPointerLock();
        // console.log(this.$router.currentRoute.value.query)

        ThreadManager.broadcast(BroadcastMessages.START);
        // this.$stateMachine.game_resume(this.canvas);
        //
        // subscribe(Events.INVENTORY_UPDATE, this.onInventoryUpdate);
    },
    beforeUnmount() {
        document.exitPointerLock();
        ThreadManager.broadcast(BroadcastMessages.STOP);
        // this.$stateMachine.game_pause(this.canvas);
        //
        // unsubscribe(Events.INVENTORY_UPDATE, this.onInventoryUpdate);
    },
    methods: {
        onInventoryUpdate() {
            this.inventoryKey *= -1;
        }
    }
};
</script>