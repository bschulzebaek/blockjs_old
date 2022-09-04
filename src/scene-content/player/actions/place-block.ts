import type PlayerController from '../PlayerController';
import SceneContainer from '../../../scene/SceneContainer';
import { ChunkFaces } from '../../../data/chunk-faces';

export default function placeBlock(block: any) {
    const scene = SceneContainer.getScene();

    const world           = scene.getWorld(),
          player          = scene.getSceneObject('player-controller') as unknown as PlayerController,
          // playerInventory = Container.getService(ServiceName.INVENTORY).getPlayerInventory(),
          selectedItem    = { itemId: 1, quantity: 32 }; //playerInventory?.getActiveItem();

    if (!selectedItem || !selectedItem.quantity) {
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

    console.log(x, y, z, selectedItem.itemId);
    // world.setBlockId(x, y, z, selectedItem.itemId);

    // publish(new BlockPlacedEvent(selectedItem.itemId, new Vector3(x, y, z), playerInventory));
}