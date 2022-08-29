import { subscribe } from '../../../common/utility/event-helper';
import Events from '../../../data/events';
import BlockID from '../../../data/block-id';
import Container, { ServiceName } from '../../../framework/container/Container';
import BlockPlacedEvent from '../../../player/actions/BlockPlacedEvent';

class BlockPlacedSubscriber {
    constructor() {
        subscribe(Events.BLOCK_PLACED, this.onBlockPlaced);
    }

    private onBlockPlaced = (event: BlockPlacedEvent) => {
        if (event.getBlockId() === BlockID.CHEST) {
            this.createChestInventory(event);
        }

        this.reduceQuantity(event);
    }

    private createChestInventory(event: BlockPlacedEvent) {
        const { x, y, z } = event.getPosition();

        Container.getService(ServiceName.INVENTORY).createInventory(`${x}:${y}:${z}`);
    }

    private reduceQuantity(event: BlockPlacedEvent) {
        const inventory = event.getInventory();

        inventory.reduceActiveItemQuantity();
    }
}

export default new BlockPlacedSubscriber();