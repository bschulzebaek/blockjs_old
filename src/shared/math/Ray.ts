import { Matrix4, transformVector, multiply, Vector4, Vector3 } from './index';
import CameraInterface from '../../scene-thread/scene-content/camera/CameraInterface';

export default class Ray {
    public camera: CameraInterface;

    constructor(camera: CameraInterface) {
        this.camera = camera;
    }

    fromScreen() {
        const sx = innerWidth / 2,
              sy = innerHeight/ 2;

        const x = sx / innerWidth * 2 - 1;
        const y = 1 - sy / innerHeight * 2;

        const invProj = this.camera.getProjectionMatrix().inverse(new Matrix4());
        const invView = this.camera.getView().inverse(new Matrix4());
        const toWorld = multiply(invView, invProj);

        const from = transformVector(toWorld, new Vector4(x, y, -1, 1));

        const near = new Vector3(
            from[0] / from[3],
            from[1] / from[3],
            from[2] / from[3]
        );

        const to = transformVector(toWorld, new Vector4(x, y, 1, 1));
        const far = new Vector3(to[0] / to[3], to[1] / to[3], to[2] / to[3]);

        const rayClip = new Vector4(x, y, 1, 1);
        const rayEye = transformVector(invProj, rayClip);

        rayEye[2] = -1;
        rayEye[3] = 0;
        const rayWorld = transformVector(invView, rayEye);
        const ray = new Vector3(rayWorld[0], rayWorld[1], rayWorld[2]);
        ray.normalize();

        return {
            near,
            far,
            ray
        }
    }
}