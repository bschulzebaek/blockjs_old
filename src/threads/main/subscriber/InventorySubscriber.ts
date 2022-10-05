import InventoryUpdateEvent from '../../../components/inventory/events/InventoryUpdateEvent';
import Container from '../Container';
import { PLAYER_INVENTORY_ID } from '../../../data/player-data';

class InventorySubscriber {
    constructor() {
        addEventListener(InventoryUpdateEvent.NAME, this.onInventoryUpdate as unknown as EventListener);
    }

    private onInventoryUpdate = (event: InventoryUpdateEvent) => {
        const inventory = event.getInventory(),
            id        = inventory.getId();

        Container.getInventoryService().saveInventory(id);

        if (id !== PLAYER_INVENTORY_ID) {
            return;
        }

        if (!Container.getStateMachine().isInGame()) {
            return;
        }

        Container.getStore().key++;
    }
}

export default new InventorySubscriber()