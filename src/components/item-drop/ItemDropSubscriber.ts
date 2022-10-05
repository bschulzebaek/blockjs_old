import BlockUpdatedEvent from '../world/events/BlockUpdatedEvent';
import SceneContainer from '../../threads/scene/SceneContainer';
import ItemDrop from './ItemDrop';
import BlockID from '../../data/block-id';
import PickupItemEvent from './events/PickupItemEvent';
import { SceneMessages } from '../../shared/messages/ThreadMessages';

class ItemDropSubscriber {
    constructor() {
        addEventListener(BlockUpdatedEvent.NAME, this.onBlockUpdated as unknown as EventListener);
        addEventListener(PickupItemEvent.NAME, this.onPickupItem as unknown as EventListener);
    }

    private onBlockUpdated = (event: BlockUpdatedEvent) => {
        if (event.getOldId() === BlockID.AIR) {
            return;
        }

        const { x, y, z } = event.getPosition();

        SceneContainer.getScene().addSceneObject(
            new ItemDrop(event.getOldId(), x, y, z),
        );
    }

    private onPickupItem = (event: PickupItemEvent) => {
        SceneContainer.getScene().deleteSceneObject(event.getEntityId());

        postMessage({ action: SceneMessages.PICKUP_ITEM, detail: { itemId: event.getItemId() }});
    }
}

export default new ItemDropSubscriber()