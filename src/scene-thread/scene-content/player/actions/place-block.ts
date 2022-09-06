import SceneContainer from '../../../SceneContainer';
import type PlayerController from '../PlayerController';
import { ChunkFaces } from '../../../../data/chunk-faces';
import { SceneMessages } from '../../../../shared/messages/ThreadMessages';
import InventorySlotInterface from '../../../../main-thread/inventory/InventorySlotInterface';

export default function placeBlock(block: any, activeItem: InventorySlotInterface) {
    const world  = SceneContainer.getWorld(),
          player = SceneContainer.getScene().getSceneObject('player-controller') as unknown as PlayerController;

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

    if (!world.chunkExists(x, z)) {
        return;
    }

    if (player.isBlocking(x, y, z)) {
        return;
    }

    world.setBlockId(x, y, z, activeItem.itemId);

    SceneContainer.getWorldPort()?.postMessage({
        action: SceneMessages.REQUEST_WORLD_CHANGE,
        detail: {
            x,
            y,
            z,
            id: activeItem.itemId
        }
    });

    postMessage({ action: SceneMessages.REDUCE_QUANTITY });
}