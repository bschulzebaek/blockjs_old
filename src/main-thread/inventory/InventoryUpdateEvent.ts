import InventoryInterface from './InventoryInterface';
import Events from '../../data/events';

export default class InventoryUpdateEvent extends Event {
    private inventory: InventoryInterface;

    constructor(inventory: InventoryInterface) {
        super(Events.INVENTORY_UPDATE);

        this.inventory = inventory;
    }

    public getInventory() {
        return this.inventory;
    }
}