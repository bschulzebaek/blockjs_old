export default class Vector4 extends Array<number> {

    public x: number;
    public y: number;
    public z: number;
    public w: number;

    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
        super(4);

        this.x = x;
        this[0] = x;

        this.y = y;
        this[1] = y;

        this.z = z;
        this[2] = z;

        this.w = w;
        this[3] = w;
    }
}