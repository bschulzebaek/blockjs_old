import SceneObjectInterface from '../../scene/SceneObjectInterface';
import Model from '../../scene/model/Model';
import CameraInterface from '../camera/CameraInterface';
import CubeModel from '../../scene/model/cube/CubeModel';
import SceneContainer from '../../scene/SceneContainer';
import getBlockFromRay from '../../shared/utility/get-block-from-ray';


export default class Cursor implements SceneObjectInterface {
    static SCENE_ID = 'cursor';
    static SHADER = 'cursor';
    static OFFSET = 0.5;

    public model?: Model;
    private camera: CameraInterface;

    constructor(camera: CameraInterface) {
        this.camera = camera;
    }

    public getId() {
        return Cursor.SCENE_ID;
    }

    public getShader() {
        return Cursor.SHADER;
    }

    public createModel() {
        const model = CubeModel.create();
        model.scale.set(1.001, 1.001, 1.001);

        this.model = model;
    }

    public update(): void {
        const world = SceneContainer.getScene().getWorld();

        if (!world) {
            throw new Error('[Scene:Cursor] Missing required property "WorldService"!');
        }

        const { model, camera } = this,
              block = getBlockFromRay(camera.getTransform().getPosition(), camera.getRay().fromScreen().ray);

        if (!block || block.blockId < 1) {
            return this.remove();
        }

        if (!model) {
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

    private remove(): void {
        delete this.model;
    }

    public getModel() {
        return this.model!;
    }
}