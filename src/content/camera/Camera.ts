import { Transform, degree2Radians, Matrix4, Ray, Vector3 } from '../../common/math';
import CameraInterface from './CameraInterface';

export default class Camera implements CameraInterface {
    public projectionMatrix: Matrix4;
    public transform: Transform;
    public view: Matrix4;
    private fov: number;
    private near: number;
    private far: number;
    private aspectRatio: number;

    public ray: Ray;

    constructor(fov = 70, near = 0.1, far = 300.0) {
        this.fov = fov;
        this.aspectRatio = this.getAspectRatio();
        this.near = near;
        this.far = far;

        this.projectionMatrix = Matrix4.perspective(fov, this.aspectRatio, near, far);
        this.transform = new Transform();
        this.view = Matrix4.identity();

        // window.addEventListener('resize', this.updateOnResize.bind(this));

        this.ray = new Ray(this);
    }

    public updateOnResize(): void {
        this.aspectRatio = this.getAspectRatio();

        this.projectionMatrix = Matrix4.perspective(this.fov, this.aspectRatio, this.near, this.far);
    }

    private getAspectRatio() {
        return window.screen.availWidth / window.screen.availHeight;
    }

    public updateViewMatrix() {
        const { transform } = this;
        const { position, rotation, view } = transform;

        this.view = Matrix4.identity(view);

        this.view.translate(position.x, position.y, position.z);
        this.view.rotateY(rotation.y * degree2Radians);
        this.view.rotateX(rotation.x * degree2Radians);

        transform.updateDirection();
        this.view.inverse();

        return this.view;
    }

    public panX(v: number) {
        const { transform } = this;

        this.updateViewMatrix();

        transform.position.x += transform.right[0] * v;
        transform.position.y += transform.right[1] * v;
        transform.position.z += transform.right[2] * v;
    }

    public panY(v: number) {
        const { transform } = this;

        this.updateViewMatrix();

        transform.position.y += transform.up[1] * v;
        transform.position.x += transform.up[0] * v;
        transform.position.z += transform.up[2] * v;
    }

    public panZ(v: number) {
        const { transform } = this;

        this.updateViewMatrix();

        transform.position.x += transform.forward[0] * v;
        transform.position.y += transform.forward[1] * v;
        transform.position.z += transform.forward[2] * v;
    }

    public setPosition(position: Vector3): void {
        this.transform.position.set(position.x, position.y, position.z);
        this.transform.position.add(0, 1.7 / 2, 0);
    }

    public setTransform(transform: Transform) {
        this.transform = transform;
    }

    public update(): void {
        this.updateViewMatrix();
    }
}