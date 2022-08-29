import { subscribe } from '../../../common/utility/event-helper';
import Events from '../../../data/events';
import Container, { ServiceName } from '../../../framework/container/Container';
import ItemDropPickupEvent from '../../item-drop/ItemDropPickupEvent';

class ItemDropPickupSubscriber {
    constructor() {
        subscribe(Events.ITEM_DROP_PICKUP, this.onPickup);
    }

    private onPickup = (event: ItemDropPickupEvent) => {
        const inventory = Container.getService(ServiceName.INVENTORY).getPlayerInventory();

        inventory.pushItem({
            itemId: event.getItemId(),
            quantity: event.getQuantity(),
        });
    }
}

export default new ItemDropPickupSubscriber();