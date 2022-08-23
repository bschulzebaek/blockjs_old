<template>
    <div class="debug-container">
        <div class="fps-container"></div>
        <div class="position-container"></div>
        <div class="cursor-container"></div>
    </div>
    <span>x</span>

    <div
        v-if="inventory"
        class="inventory-bar"
    >
        <item-slot
            v-for="i in 9"
            :item="getItem(i)"
            :active="i - 1 === selected"
        ></item-slot>
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
        canvas: {
            required: true,
            type: HTMLElement,
        },
        inventory: {
            required: false,
            type: Object
        }
    },
    mounted() {
        window.addEventListener('wheel', this.onScroll);

        if (this.$container.isRunning()) {
            return;
        }

        this.$container.resume(this.canvas);
    },
    beforeUnmount() {
        window.removeEventListener('wheel', this.onScroll);

        this.$container.pause();
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
.debug-container {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.5rem;
}

span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.5rem;
}

.inventory-bar {
    position: absolute;
    left: 50%;
    bottom: 5px;
    transform: translateX(-50%);
    grid-template-columns: repeat(9, 1fr);
    display: grid;
    border-radius: 3px;
    overflow: hidden;
    /* border: 3px solid #ccc; */
    background: rgba(0, 0, 0, .5);
}
</style>
