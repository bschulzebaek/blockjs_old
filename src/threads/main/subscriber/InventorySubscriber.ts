import InventoryUpdateEvent from '../../../components/inventory/events/InventoryUpdateEvent';
import Container from '../Container';

class InventorySubscriber {
    constructor() {
        addEventListener(InventoryUpdateEvent.NAME, this.onInventoryUpdate as unknown as EventListener);
    }

    private onInventoryUpdate = (event: InventoryUpdateEvent) => {
        const inventory = event.getInventory(),
            id = inventory.getId();

        Container.getInventoryService().saveInventory(id);

        Container.getStore().key++;
    }
}

export default new InventorySubscriber()