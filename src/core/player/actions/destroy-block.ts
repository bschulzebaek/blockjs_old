import BlockID from '../../../data/block-id';
import BlockMeta from '../../../data/block-meta';
import Container from '../../Container';
import { ServiceName } from '../../Container';
// import ItemDrop from '../../../content/item-drop/ItemDrop';

function printInfo(details: object) {
    console.debug({
        Action: 'Edit block',
        ...details
    });
}

function onDestroyChest(id: string) {
    Container.getService(ServiceName.INVENTORY).deleteInventory(id);
}

export default function destroyBlock(block: any) {
    const world = Container.getService(ServiceName.WORLD).getWorld()!,
        //   sceneService = Container.getService(ServiceName.SCENE),
          x = block.x,
          y = block.y,
          z = block.z;

    const positionStr = `${x}:${y}:${z}`;

    const blockId = block.blockId as BlockID;

    if (BlockMeta[blockId].durability === -1) {
        return printInfo({ Position: positionStr, Message: 'Block cant be removed!' });
    }

    if (blockId === BlockID.CHEST) {
        onDestroyChest(positionStr);
    }

    world.setBlockId(x, y, z, BlockID.AIR);

    // sceneService.addEntity(new ItemDrop(blockId, x, y, z));

    // printInfo({ Position: positionStr, 'New Block ID': 0 });
}