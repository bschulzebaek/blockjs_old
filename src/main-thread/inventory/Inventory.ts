import StoreClass from '../../shared/storage/StoreClass';
import InventoryInterface from './InventoryInterface';
import InventorySlotInterface from './InventorySlotInterface';
import { publish } from '../../shared/utility/event-helper';
import InventoryUpdateEvent from './InventoryUpdateEvent';
import BlockMeta from '../../data/block-meta';
import MainContainer from '../MainContainer';

export interface InventoryRawInterface {
    id: string;
    slots: Array<InventorySlotInterface | null>;
    activeIndex: number;
}

export default class Inventory extends StoreClass implements InventoryInterface {
    static STORAGE_FIELDS = [
        'id',
        'slots',
        'activeIndex',
    ];

    static DEFAULT_SIZE = 36;

    private id: string;

    private slots: Array<InventorySlotInterface | null>;

    private activeIndex;

    constructor(id: string, slots = new Array(Inventory.DEFAULT_SIZE).fill(null), activeIndex: number = 0) {
        super(id, Inventory.STORAGE_FIELDS);

        this.id = id;
        this.slots = slots;
        this.activeIndex = activeIndex;
    }

    public getId() {
        return this.id;
    }

    public getItem(index: number) {
        return this.slots[index];
    }

    public getActiveItem() {
        return this.slots[this.activeIndex];
    }

    public getActiveIndex() {
        return this.activeIndex;
    }

    public reduceActiveItemQuantity() {
        const item = this.getActiveItem();

        if (!item) {
            return;
        }

        item.quantity--;

        if (item.quantity === 0) {
            this.clearSlot(this.getActiveIndex());
        } else {
            this.dispatchUpdate();
        }
    }

    public setActiveIndex(index: number) {
        if (index > this.slots.length) {
            throw new Error('[Inventory] Index exceeds inventory slots!');
        }

        this.activeIndex = index;

        this.dispatchUpdate();
    }

    public pushItem(item: InventorySlotInterface) {
        let firstEmpty = -1;
        let remaining = item.quantity;

        for (let i = 0; i < this.slots.length; i++) {
            if (remaining <= 0) {
                i = this.slots.length;
            }

            const current = this.slots[i];

            if (!current) {
                if (firstEmpty === -1) {
                    firstEmpty = i;
                }
            } else if (current.itemId === item.itemId && current.quantity < BlockMeta[current.itemId].stack) {
                current.quantity += remaining;

                remaining = current.quantity - BlockMeta[current.itemId].stack;
            }
        }

        if (remaining > 0 && firstEmpty > -1) {
            this.slots[firstEmpty] = {
                ...item,
                quantity: remaining,
            }
        }

        this.dispatchUpdate();
    }

    public setSlot(index: number, item: InventorySlotInterface | null = null) {
        this.slots[index] = item;

        this.dispatchUpdate();
    }

    public setItemPosition(from: number, to: number) {
        const fromItem = this.slots[from],
            toItem = this.slots[to];

        this.slots[from] = toItem;
        this.slots[to] = fromItem;

        this.dispatchUpdate();
    }

    public clearSlot(index: number) {
        this.slots[index] = null;

        this.dispatchUpdate();
    }

    public getRaw() {
        return {
            id: this.id,
            slots: this.slots,
            activeIndex: this.activeIndex,
        }
    }

    static createFromRaw(inventoryRaw: InventoryRawInterface): Inventory {
        const { id, slots, activeIndex } = inventoryRaw;

        return new Inventory(
            id,
            slots,
            activeIndex,
        );
    }

    private async dispatchUpdate() {
        MainContainer.getInventoryService().saveInventory(this.getId());

        publish(new InventoryUpdateEvent(this));
    }
}