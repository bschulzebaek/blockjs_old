import SceneContainer from '../../../SceneContainer';
import BlockID from '../../../../data/block-id';
import BlockMeta from '../../../../data/block-meta';
import ItemDrop from '../../item-drop/ItemDrop';

export default function destroyBlock(block: any) {
    const x = block.x,
          y = block.y,
          z = block.z;

    const blockId = block.blockId as BlockID;

    if (BlockMeta[blockId].durability === -1) {
        return;
    }

    SceneContainer.getWorldService().setBlock(x, y, z, BlockID.AIR);

    new ItemDrop(blockId, x, y, z);

    if (blockId === BlockID.CHEST) {
        SceneContainer.getInventoryService().deleteInventory(`${x}:${y}:${z}`);
    }
}