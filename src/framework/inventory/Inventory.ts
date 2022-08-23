import Container, { ServiceName } from '../Container';
import StoreClass from '../storage/StoreClass';
import InventoryInterface from './InventoryInterface';
import InventorySlotInterface from './InventorySlotInterface';

export interface InventoryRawInterface {
    id: string;
    slots: Array<InventorySlotInterface|null>;
    activeIndex: number;
}

export default class Inventory extends StoreClass implements InventoryInterface {
    static EVENT_UPDATE = 'inventory/update';

    static STORAGE_FIELDS  = [
        'id',
        'slots',
        'activeIndex',
    ];

    static DEFAULT_SIZE = 36;

    private id: string;

    private slots: Array<InventorySlotInterface|null>;

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

    public setActiveIndex(index: number) {
        if (index > this.slots.length) {
            throw new Error('[Inventory] Index exceeds inventory slots!');
        }

        this.activeIndex = index;

        this.dispatchUpdate();
    }

    public pushItem(item: InventorySlotInterface) {
        for (let i = 0; i < this.slots.length; i++) {
            if (this.slots[i] === null) {
                this.slots[i] = item;
                i = this.slots.length;
            }
        }
    }

    public setSlot(index: number, item: InventorySlotInterface|null = null) {
        this.slots[index] = item;

        this.dispatchUpdate();
    }

    public setItemPosition(from: number, to: number) {
        const fromItem  = this.slots[from],
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

    private dispatchUpdate() {
        Container.getService(ServiceName.INVENTORY).saveInventory(this.getId());

        window.dispatchEvent(new CustomEvent(Inventory.EVENT_UPDATE, {
            detail: this
        }));
    }
}