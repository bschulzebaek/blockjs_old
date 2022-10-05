import { ChunkFaces } from '../../../data/chunk-faces';
import InventorySlotInterface from '../../inventory/InventorySlotInterface';
import SetBlockEvent from '../../world/events/SetBlockEvent';
import { SceneMessages } from '../../../shared/messages/ThreadMessages';
import SceneContainer from '../../../threads/scene/SceneContainer';
import PlayerController from '../PlayerController';

export default function placeBlock(block: any, activeItem: InventorySlotInterface) {
    if (!activeItem || !activeItem.quantity) {
        return;
    }

    if (!block) {
        return;
    }

    const n = ChunkFaces[block.face].n,
          x = block.x + n[0],
          y = block.y + n[1],
          z = block.z + n[2];

    const player = SceneContainer.getScene().getSceneObject('player-controller') as unknown as PlayerController;

    if (player.isBlocking(x, y, z)) {
        return;
    }

    dispatchEvent(new SetBlockEvent(x, y, z, activeItem.itemId));
    postMessage({ action: SceneMessages.REDUCE_QUANTITY });
}