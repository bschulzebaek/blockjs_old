import BlockID from '../../data/block-id';
import BlockMeta from '../../data/block-meta';
import SetBlockEvent from '../../components/world/events/SetBlockEvent';

export default function destroyBlock(block: any) {
    const x = block.x,
          y = block.y,
          z = block.z;

    const blockId = block.blockId as BlockID;

    if (BlockMeta[blockId].durability === -1) {
        return;
    }

    dispatchEvent(new SetBlockEvent(x, y, z, BlockID.AIR));
}