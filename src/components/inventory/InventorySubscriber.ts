import BlockID from '../../data/block-id';
import SceneContainer from '../../threads/scene/SceneContainer';
import BlockUpdatedEvent from '../world/events/BlockUpdatedEvent';

class InventorySubscriber {
    constructor() {
        addEventListener(BlockUpdatedEvent.NAME, this.onBlockUpdated as unknown as EventListener);
    }

    private onBlockUpdated = (event: BlockUpdatedEvent) => {
        if (event.getOldId() !== BlockID.CHEST) {
            return;
        }

        const inventoryService = SceneContainer.getInventoryService();
        const { x, y, z } = event.getPosition();

        inventoryService.deleteInventory(`${x}:${y}:${z}`);
    }
}

export default new InventorySubscriber()