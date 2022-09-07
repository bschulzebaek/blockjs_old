import SceneObjectInterface from '../../SceneObjectInterface';
import Model from '../../model/Model';
import CubeModel from '../../model/cube/CubeModel';
import SceneContainer from '../../SceneContainer';
import getBlockFromRay from '../../world-helper/get-block-from-ray';
import { ShaderName } from '../../../render-thread/shader/ShaderRegistry';

export default class Cursor implements SceneObjectInterface {
    static SCENE_ID = 'cursor';
    static SHADER = ShaderName.CURSOR;
    static OFFSET = 0.5;

    public model?: Model;

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
        const world = SceneContainer.getWorld();

        if (!world) {
            throw new Error('[Scene:Cursor] Missing required property "WorldService"!');
        }

        const camera = SceneContainer.getCamera();
        const block = getBlockFromRay(camera.getTransform().getPosition(), camera.getRay().fromScreen().ray);

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
    }

    public getModel() {
        return this.model!;
    }
}