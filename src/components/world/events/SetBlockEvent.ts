import { Vector3 } from '../../../shared/math';
import BlockID from '../../../data/block-id';

export default class SetBlockEvent extends Event {
    static NAME = 'world/set-block';

    private readonly position: Vector3;
    private readonly id: BlockID;

    constructor(x: number, y: number, z: number, id: BlockID) {
        super(SetBlockEvent.NAME);

        this.position = new Vector3(x, y, z);
        this.id = id;
    }

    public getPosition = () => {
        return this.position;
    }

    public getId = () => {
        return this.id;
    }
}