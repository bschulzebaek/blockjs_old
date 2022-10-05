import type Inventory from '../Inventory';

export default class InventoryUpdateEvent extends Event {
    static NAME = 'inventory/update';

    private readonly inventory: Inventory;

    constructor(inventory: Inventory) {
        super(InventoryUpdateEvent.NAME);

        this.inventory = inventory;
    }

    public getInventory() {
        return this.inventory;
    }
}