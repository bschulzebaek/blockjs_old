import { Matrix4, Ray, Transform, Vector3 } from '../../../math';

export default interface CameraInterface {
    projectionMatrix: Matrix4;
    transform: Transform;
    view: Matrix4;
    ray: Ray;

    updateViewMatrix(): void;
    panX(value: number): void;
    panY(value: number): void;
    panZ(value: number): void;
    setPosition(position: Vector3): void;
    setTransform(position: Transform): void;
    update(delta: number): void;
}