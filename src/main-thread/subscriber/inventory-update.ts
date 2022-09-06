import Events from '../../data/events';
import MainContainer from '../MainContainer';
import InventoryUpdateEvent from '../inventory/InventoryUpdateEvent';
import { PLAYER_INVENTORY_ID } from '../../data/player-data';

// @ts-ignore
addEventListener(Events.INVENTORY_UPDATE, (event: InventoryUpdateEvent) => {
    const inventory = event.getInventory(),
          id        = inventory.getId();

    MainContainer.getInventoryService().saveInventory(id);

    if (id !== PLAYER_INVENTORY_ID) {
        return;
    }

    MainContainer.getStore().key++;
});