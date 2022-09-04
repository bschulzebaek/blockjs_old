import SceneContainer from '../../../scene/SceneContainer';
import BlockID from '../../../data/block-id';
import BlockMeta from '../../../data/block-meta';

export default function destroyBlock(block: any) {
    // @ts-ignore
    const world = SceneContainer.getScene().getWorld(),
          x = block.x,
          y = block.y,
          z = block.z;

    const blockId = block.blockId as BlockID;

    if (BlockMeta[blockId].durability === -1) {
        return;
    }

    console.log(x, y, z, BlockID.AIR);
    // world.setBlockId(x, y, z, BlockID.AIR);

    // publish(new BlockDestroyedEvent(blockId, new Vector3(x, y, z)));
}