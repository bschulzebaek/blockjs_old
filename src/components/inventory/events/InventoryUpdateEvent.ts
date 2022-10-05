import InventoryInterface from '../InventoryInterface';

export default class InventoryUpdateEvent extends Event {
    static NAME = 'inventory/update';

    private readonly inventory: InventoryInterface;

    constructor(inventory: InventoryInterface) {
        super(InventoryUpdateEvent.NAME);

        this.inventory = inventory;
    }

    public getInventory() {
        return this.inventory;
    }
}