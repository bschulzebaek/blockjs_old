import CameraInterface from '../camera/CameraInterface';
import BlockNames from '../../data/block-name';
import BlockID from '../../data/block-id';
import Container, { ServiceName } from '../../framework/container/Container';
import getBlockFromRay from '../../common/utility/get-block-from-ray';
import Model from '../../framework/scene/model/Model';
import CubeModel from '../../framework/scene/model/cube/CubeModel';
import SceneObjectInterface from '../../framework/scene/SceneObjectInterface';
import ShaderInterface from '../../framework/renderer/ShaderInterface';

export default class Cursor implements SceneObjectInterface {
    static SCENE_ID = 'cursor';
    static OFFSET = 0.5;

    private model?: Model;
    private camera: CameraInterface;
    private shader!: ShaderInterface;

    constructor(camera: CameraInterface) {
        this.camera = camera;
    }

    public getId() {
        return Cursor.SCENE_ID;
    }

    public createModel() {
        const model = CubeModel.create();
        model.scale.set(1.001, 1.001, 1.001);

        this.model = model;
    }

    public createShaderReference(): void {
        this.shader = Container.getShader('cursor');
    }

    public update(): void {
        const world = Container.getService(ServiceName.WORLD).getWorld();

        if (!world) {
            throw new Error('[Scene:Cursor] Missing required property "World"!');
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
        this.shader.run();
    }

    private updatePosition(block: any) {
        if (!this.isNewPosition(block)) {
            return;
        }

        this.debugCursor(block);

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

        const el = document.querySelector('.cursor-container');

        if (!el) {
            return;
        }

        el.innerHTML = '';
    }

    private debugCursor(block: any) {
        const el = document.querySelector('.cursor-container');

        if (!el) {
            return;
        }

        if (!block) {
            el.innerHTML = '';
        } else {
            const { x, y, z, blockId } = block;
            const blockName = BlockNames[blockId as BlockID];

            el.innerHTML = `Looking at ${blockName} (${x}:${y}:${z})`;
        }
    }

    public getModel() {
        return this.model!;
    }
}