export default class Vector3 extends Array<number> {
    public x: number = 0;
    public y: number = 0;
    public z: number = 0;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        super(3);

        this.set(x, y, z);
    }

    public set = (x: number, y: number, z: number) => {
        this.x = x;
        this[0] = x;

        this.y = y;
        this[1] = y;

        this.z = z;
        this[2] = z;
    }

    public add = (x: number, y: number, z: number) => {
        this.set(this.x + x, this.y + y, this.z + z);
    }

    public scale = (scale: number): void => {
        this.set(this.x * scale, this.y * scale, this.z * scale);
    }

    public lengthSq = (): number => {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    public normalize = () => {
        const { x, y, z } = this;
        const d = Math.sqrt(x * x + y * y + z * z);

        this.set(this.x / d, this.y / d, this.z / d);
    }

    public static from(vector: Vector3): Vector3 {
        return new Vector3(vector.x, vector.y, vector.z);
    }
}