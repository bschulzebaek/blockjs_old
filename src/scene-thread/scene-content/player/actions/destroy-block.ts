import SceneContainer from '../../../SceneContainer';
import BlockID from '../../../../data/block-id';
import BlockMeta from '../../../../data/block-meta';
import { SceneMessages } from '../../../../thread-manager/ThreadMessages';
import ItemDrop from '../../item-drop/ItemDrop';

export default function destroyBlock(block: any) {
    // @ts-ignore
    const world = SceneContainer.getWorld(),
          x = block.x,
          y = block.y,
          z = block.z;

    const blockId = block.blockId as BlockID;

    if (BlockMeta[blockId].durability === -1) {
        return;
    }

    SceneContainer.getWorld().setBlockId(x, y, z, BlockID.AIR);
    SceneContainer.getWorldPort()?.postMessage({
        action: SceneMessages.REQUEST_WORLD_CHANGE,
        detail: {
            x,
            y,
            z,
            id: BlockID.AIR,
        }
    });

    new ItemDrop(blockId, x, y, z);

    // publish(new BlockDestroyedEvent(blockId, new Vector3(x, y, z)));
}