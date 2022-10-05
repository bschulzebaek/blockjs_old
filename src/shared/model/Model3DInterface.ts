import { Matrix4, Vector3, Vector4 } from '../../shared/math';
import Mesh from './Mesh';

export default interface Model3DInterface {
    update(delta: number): void;

    mesh: Mesh;

    position: Vector3;
    scale?: Vector3;
    rotation?: Vector3;
    view?: Matrix4;
    normal?: Float32Array;
    forward?: Vector4;
    up?: Vector4;
    right?: Vector4;
}