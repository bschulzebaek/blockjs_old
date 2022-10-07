import BlockUpdatedEvent from '../../../components/world/events/BlockUpdatedEvent';
import PickupItemEvent from '../../../components/item-drop/events/PickupItemEvent';
import SceneContainer from '../SceneContainer';
import ItemDrop from '../../../components/item-drop/ItemDrop';
import { SceneMessages } from '../../../shared/messages/ThreadMessages';
import CollisionShapeRegistry from '../../../framework/physics/CollisionShapeRegistry';
import BlockMeta from '../../../data/block-meta';

class ItemDropSubscriber {
    constructor() {
        addEventListener(BlockUpdatedEvent.NAME, this.onBlockUpdated as unknown as EventListener);
        addEventListener(PickupItemEvent.NAME, this.onPickupItem as unknown as EventListener);
    }

    private onBlockUpdated = (event: BlockUpdatedEvent) => {
        const blockId = event.getOldId(),
            meta = BlockMeta[blockId];

        if (meta.drop === false) {
            return;
        }

        const { x, y, z } = event.getPosition();

        const dropId = typeof meta.drop === 'number' ? meta.drop : blockId;

        SceneContainer.getScene().addSceneObject(
            new ItemDrop(dropId, x, y, z, SceneContainer.getWorld()),
        );
    }

    private onPickupItem = (event: PickupItemEvent) => {
        SceneContainer.getScene().deleteSceneObject(event.getEntityId());
        CollisionShapeRegistry.remove(event.getEntityId());

        postMessage({ action: SceneMessages.PICKUP_ITEM, detail: { itemId: event.getItemId() }});
    }
}

export default new ItemDropSubscriber()