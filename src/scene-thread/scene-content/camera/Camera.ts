import { Transform, degree2Radians, Matrix4, Ray, Vector3 } from '../../../shared/math';
import Message from '../../../shared/utility/Message';
import { RenderMessages } from '../../../shared/messages/ThreadMessages';
import SceneContainer from '../../SceneContainer';

export default class Camera  {
    static SCENE_ID = 'camera';

    protected projectionMatrix: Matrix4;
    protected transform: Transform;
    protected view: Matrix4;
    protected fov: number;
    protected near: number;
    protected far: number;
    protected aspectRatio: number;
    protected ray: Ray;

    constructor(fov = 70, near = 0.1, far = 300.0) {
        this.aspectRatio = this.getAspectRatio();
        this.fov = fov;
        this.near = near;
        this.far = far;

        this.transform = new Transform();
        this.view = Matrix4.identity();

        this.ray = new Ray(this);
        this.projectionMatrix = this.createProjectionMatrix();
    }

    public getId() {
        return Camera.SCENE_ID;
    }

    protected createProjectionMatrix(): Matrix4 {
        return Matrix4.perspective(this.fov, this.aspectRatio, this.near, this.far);
    }

    public createModel(): void {

    }

    public createShader(): void {

    }

    public getProjectionMatrix() {
        return this.projectionMatrix;
    }

    public getView() {
        return this.view;
    }

    public getRay() {
        return this.ray;
    }

    protected getAspectRatio() {
        return innerWidth / innerHeight;
    }

    protected updateViewMatrix() {
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

    public setPosition(position: Vector3): void {
        this.transform.position.set(position.x, position.y, position.z);
        this.transform.position.add(0, 1.7 / 2, 0);
    }

    public getTransform() {
        return this.transform;
    }

    public setTransform(transform: Transform) {
        this.transform = transform;
    }

    public update = (): void => {
        this.updateViewMatrix();
        this.syncToRenderer();
    }

    private syncToRenderer() {
        const data = {
            projection: new Float32Array(this.projectionMatrix),
            view: new Float32Array(this.view),
        };

        Message.send(
            RenderMessages.SYNC_CAMERA,
            data,
            SceneContainer.getRenderPort(),
            [ data.view.buffer, data.projection.buffer ]
        );
    }
}