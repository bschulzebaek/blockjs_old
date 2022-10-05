import { Vector3 } from '../../../shared/math'

export default class UpdateGridEvent extends Event {
    static NAME = 'world/update-grid';

    private readonly position: Vector3;

    constructor(x: number, z: number) {
        super(UpdateGridEvent.NAME);

        this.position = new Vector3(x, 0, z);

        this.getPosition = this.getPosition.bind(this);
    }

    public getPosition() {
        return this.position;
    }
}