import { ShaderName } from '../../framework/shader/shader-names';
import Model3D from '../../shared/model/Model3D';
import WorldInterface from '../world/WorldInterface';
import CameraInterface from '../camera/CameraInterface';
import CubeModel from '../../shared/model/cube/CubeModel';
import getBlockFromRay from '../../shared/utility/get-block-from-ray';
import RawRenderObjectInterface from '../../framework/shader/RawRenderObjectInterface';
import SceneObjectInterface from '../../threads/scene/scene/SceneObjectInterface';
import syncRenderObject, { SyncAction } from '../../threads/scene/helper/sync-render-object';

export default class Cursor implements SceneObjectInterface {
    static SCENE_ID = 'cursor';
    static SHADER = ShaderName.CURSOR;
    static OFFSET = 0.5;

    public model?: Model3D;
    private world: WorldInterface;
    private camera: CameraInterface;

    constructor(camera: CameraInterface, world: WorldInterface) {
        this.camera = camera;
        this.world = world;
        this.createModel();
    }

    public getId() {
        return Cursor.SCENE_ID;
    }

    public getShader() {
        return Cursor.SHADER;
    }

    public createModel() {
        const model = CubeModel.create(Cursor.SCENE_ID, Cursor.SHADER);

        model.scale.set(1.001, 1.001, 1.001);

        this.model = model;
    }

    public update(): void {
        const { camera, world } = this;
        const block = getBlockFromRay(
            world,
            camera.getTransform().getPosition(),
            camera.getRay().fromScreen().ray,
            8,
        );

        if (!block || block.blockId < 1) {
            return this.remove();
        }

        if (!this.model) {
            this.createModel();
        }

        this.updatePosition(block);
    }

    private updatePosition(block: any) {
        if (!this.isNewPosition(block)) {
            return;
        }

        this.model?.position.set(block.x, block.y, block.z);
        this.model?.position.add(Cursor.OFFSET, Cursor.OFFSET, Cursor.OFFSET);
        this.model?.update();
    }

    private isNewPosition(block: any): boolean {
        return (
            this.model?.position.x !== block.x + Cursor.OFFSET ||
            this.model?.position.y !== block.y + Cursor.OFFSET ||
            this.model?.position.z !== block.z + Cursor.OFFSET
        );
    }

    public remove(): void {
        delete this.model;

        // ToDo: Should be done using SceneEvents (tbi)
        syncRenderObject(
            SyncAction.DELETE,
            this.getId(),
        );
    }

    public getRenderData(): RawRenderObjectInterface | null {
        if (!this.model) {
            return null;
        }

        return this.model.toRawRenderObject();
    }
}