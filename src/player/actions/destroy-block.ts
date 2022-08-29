import { Vector3 } from '../../common/math';
import { publish } from '../../common/utility/event-helper';
import BlockID from '../../data/block-id';
import BlockMeta from '../../data/block-meta';
import Container, { ServiceName } from '../../framework/container/Container';
import BlockDestroyedEvent from './BlockDestroyedEvent';

export default function destroyBlock(block: any) {
    const world = Container.getService(ServiceName.WORLD).getWorld(),
          x = block.x,
          y = block.y,
          z = block.z;

    const blockId = block.blockId as BlockID;

    if (BlockMeta[blockId].durability === -1) {
        return;
    }

    world.setBlockId(x, y, z, BlockID.AIR);

    publish(new BlockDestroyedEvent(blockId, new Vector3(x, y, z)));
}