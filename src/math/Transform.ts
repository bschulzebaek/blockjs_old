import { Vector3, Matrix4, Vector4, degree2Radians, transformVector } from '.';

export default class Transform {
    public position: Vector3;
    public scale: Vector3;
    public rotation: Vector3;
    public view: Matrix4;
    public normal: Float32Array;
    public forward: Vector4;
    public up: Vector4;
    public right: Vector4;

    constructor() {
        this.scale = new Vector3(1, 1, 1);
        this.rotation = new Vector3();
        this.position = new Vector3();
        this.view = Matrix4.identity();
        this.normal = new Float32Array(9);
        this.forward = new Vector4();
        this.up = new Vector4();
        this.right = new Vector4();
    }

    public reset(): void {
        this.position.set(0, 0, 0);
        this.scale.set(1, 1, 1);
        this.rotation.set(0, 0, 0);
    }

    public updateMatrix(): void {
        this.view = Matrix4.identity();
        this.view.translate(this.position.x, this.position.y, this.position.z);
        this.view.rotateX(this.rotation.x * degree2Radians);
        this.view.rotateY(this.rotation.y * degree2Radians);
        this.view.rotateZ(this.rotation.z * degree2Radians);
        this.view.scale(this.scale.x, this.scale.y, this.scale.z);
        this.updateDirection();
    }

    public updateDirection(): void {
        this.forward = transformVector(this.view, new Vector4(0, 0, 1, 0));
        this.up = transformVector(this.view, new Vector4(0, 1, 0, 0));
        this.right = transformVector(this.view, new Vector4(1, 0, 0, 0));
    }
}