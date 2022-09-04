import { subscribe } from '../../../common/utility/event-helper';
import Events from '../../../data/events';
import BlockID from '../../../data/block-id';
import Container, { ServiceName } from '../../../framework/container/Container';
import BlockDestroyedEvent from '../../../../player/actions/BlockDestroyedEvent';

class BlockDestroyedSubscriber {
    constructor() {
        subscribe(Events.BLOCK_DESTROYED, this.onBlockDestroyed);
    }

    private onBlockDestroyed = (event: BlockDestroyedEvent) => {
        if (event.getBlockId() !== BlockID.CHEST) {
            return;
        }

        const { x, y, z } = event.getPosition();

        Container.getService(ServiceName.INVENTORY).deleteInventory(`${x}:${y}:${z}`);
    }
}

export default new BlockDestroyedSubscriber();