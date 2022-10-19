<template>
    <div
        class="item-slot"
        :class="active ? 'item-slot--active' : ''"
    >
        <div
            v-if="item"
            class="item-slot--inner"
        >
            <span class="item-slot--icon">
                <img
                    :src="`/assets/item-icons/block_${item.itemId}.png`"
                    :alt="item.itemId"
                    draggable="false"
                />
            </span>

            <span class="item-slot--quantity">
                {{ item.quantity }}
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        item: {
            type: Object,
            default: null,
        },
        active: {
            type: Boolean,
            default: false,
        },
    },
});
</script>

<style scoped>
.item-slot {
    border: 2px solid transparent;
    color: #fff;
    text-align: center;
    vertical-align: middle;
    height: 60px;
    width: 60px;
}

.item-slot--active {
    border-color: #fff;
}

.item-slot--inner {
    position: relative;
    height: 100%;
    width: 100%;
    cursor: pointer;
}

.item-slot--icon {
    display: block;
    padding: 3px;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
}

.item-slot--icon > img {
    width: 100%;
    height: 100%;
}

.item-slot--quantity {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 13px;
    padding: 1px;
}
</style>
