import { Vector3 } from '../../common/math';
import { publish } from '../../common/utility/event-helper';
import BlockID from '../../data/block-id';
import BlockMeta from '../../data/block-meta';
import Events from '../../data/events';
import Container, { ServiceName } from '../../framework/container/Container';

export class BlockDestroyedEvent extends Event {

    private blockId: BlockID;
    private position: Vector3;

    constructor(blockId: BlockID, position: Vector3) {
        super(Events.BLOCK_DESTROYED);

        this.blockId = blockId;
        this.position = position;
    }

    public getBlockId() {
        return this.blockId;
    }

    public getPosition() {
        return this.position;
    }
}

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