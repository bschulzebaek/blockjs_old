import Container, { ServiceName } from '../../Container';
import { ChunkFaces } from '../../data/chunk-faces';

function printInfo(details: object) {
    console.debug({
        Action: 'Edit block',
        ...details
    });
}

export default function placeBlock(block: any) {
    const world           = Container.getService(ServiceName.WORLD).getWorld()!,
          player          = Container.getService(ServiceName.SCENE).getController()!,
          playerInventory = Container.getService(ServiceName.INVENTORY).getInventory(
            Container.getService(ServiceName.ENTITY).getPlayer()!.getInventoryId()
          ),
          selectedItem    = playerInventory?.getActiveItem();

    if (!selectedItem || !selectedItem.quantity) {
        return;
    }

    if (!block) {
        return printInfo({ 'Message': 'No target block found!' });
    }

    const n = ChunkFaces[block.face].n,
          x = block.x + n[0],
          y = block.y + n[1],
          z = block.z + n[2];

    if (!world.chunkExists(x, z)) {
        return printInfo({ Position: `${x}:${y}:${z}`, Message: 'No chunk found at given position!' });
    }

    if (player.isBlocking(x, y, z)) {
        return printInfo({ Position: `${x}:${y}:${z}`, Message: 'Position blocked by player!' });
    }

    world.setBlockId(x, y, z, selectedItem.itemId);

    printInfo({ Position: `${x}:${y}:${z}`, 'New Block ID': selectedItem.itemId });
}