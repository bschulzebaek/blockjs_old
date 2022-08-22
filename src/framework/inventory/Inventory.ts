import StoreClass from '../storage/StoreClass';
import InventoryInterface from './InventoryInterface';
import InventorySlotInterface from './InventorySlotInterface';

export interface InventoryRawInterface {
    id: string;
    slots: Array<InventorySlotInterface|null>;
}

export default class Inventory extends StoreClass implements InventoryInterface {
    static EVENT_UPDATE = 'inventory/update';

    static STORAGE_FIELDS  = [
        'id',
        'slots'
    ];

    static DEFAULT_SIZE = 36;

    private id: string;

    private slots: Array<InventorySlotInterface|null>;

    constructor(id: string, slots = new Array(Inventory.DEFAULT_SIZE).fill(null)) {
        super(id, Inventory.STORAGE_FIELDS);

        this.id = id;
        this.slots = slots;
    }

    public getId() {
        return this.id;
    }

    public setSlot(index: number, item: InventorySlotInterface) {
        this.slots[index] = item;

        this.dispatchUpdate();
    }

    public swapSlots(indexA: number, indexB: number) {
        const itemA = this.slots[indexA],
              itemB = this.slots[indexB];

        this.slots[indexA] = itemB;
        this.slots[indexB] = itemA;

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
        }
    }

    static createFromRaw(inventoryRaw: InventoryRawInterface): Inventory {
        const { id, slots } = inventoryRaw;

        return new Inventory(
            id,
            slots
        );
    }

    private dispatchUpdate() {
        window.dispatchEvent(new CustomEvent(Inventory.EVENT_UPDATE, {
            detail: this.getRaw()
        }));
    }
}