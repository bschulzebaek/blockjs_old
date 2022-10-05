import { ChunkFaces } from '../../data/chunk-faces';
import InventorySlotInterface from '../../components/inventory/InventorySlotInterface';
import SetBlockEvent from '../../components/world/events/SetBlockEvent';
import { SceneMessages } from '../../shared/messages/ThreadMessages';

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

    dispatchEvent(new SetBlockEvent(x, y, z, activeItem.itemId));
    postMessage({ action: SceneMessages.REDUCE_QUANTITY });
}