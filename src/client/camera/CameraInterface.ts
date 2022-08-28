import { Matrix4, Ray, Transform, Vector3 } from '../../common/math';

export default interface CameraInterface {
    getProjectionMatrix(): Matrix4;
    getView(): Matrix4;
    getRay(): Ray;
    getTransform(): Transform;

    setPosition(position: Vector3): void;
    setTransform(position: Transform): void;
    update(delta: number): void;
}