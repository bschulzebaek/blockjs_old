import BlockID from '../../../data/block-id';
import { Vector3 } from '../../../shared/math';
import Events from '../../../data/events';

export default class BlockDestroyedEvent extends Event {

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