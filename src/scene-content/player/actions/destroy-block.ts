import SceneContainer from '../../../engine/scene/SceneContainer';
import BlockID from '../../../data/block-id';
import BlockMeta from '../../../data/block-meta';
import { SceneMessages } from '../../../engine/threads/ThreadMessages';

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

    SceneContainer.getScene().getWorld().setBlockId(x, y, z, BlockID.AIR);
    SceneContainer.getWorldPort()?.postMessage({
        action: SceneMessages.REQUEST_WORLD_CHANGE,
        detail: {
            x,
            y,
            z,
            id: BlockID.AIR,
        }
    });

    // publish(new BlockDestroyedEvent(blockId, new Vector3(x, y, z)));
}