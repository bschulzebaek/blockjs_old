import { Vector3 } from '../../../shared/math';
import BlockID from '../../../data/block-id';

export default class BlockUpdatedEvent extends Event {
    static NAME = 'world/block-updated';

    private readonly position: Vector3;
    private readonly oldId: BlockID;
    private readonly newId: BlockID;

    constructor(x: number, y: number, z: number, oldId: BlockID, newId: BlockID) {
        super(BlockUpdatedEvent.NAME);

        this.position = new Vector3(x, y, z);
        this.oldId = oldId;
        this.newId = newId;
    }

    public getPosition = () => {
        return this.position;
    }

    public getOldId = () => {
        return this.oldId;
    }

    public getNewId = () => {
        return this.newId;
    }
}