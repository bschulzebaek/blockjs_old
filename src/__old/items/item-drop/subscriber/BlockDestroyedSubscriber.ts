import { subscribe } from '../../../common/utility/event-helper';
import Events from '../../../data/events';
import BlockDestroyedEvent from '../../../../player/actions/BlockDestroyedEvent';
import ItemDrop from '../ItemDrop';
import Container from '../../../framework/container/Container';

class BlockDestroyedSubscriber {
    constructor() {
        subscribe(Events.BLOCK_DESTROYED, this.onBlockDestroyed);
    }

    private onBlockDestroyed = (event: BlockDestroyedEvent) => {
        const { x, y, z } = event.getPosition();

        Container.getScene()?.addSceneObject(
            new ItemDrop(event.getBlockId(), x, y, z)
        );
    }
}

export default new BlockDestroyedSubscriber();