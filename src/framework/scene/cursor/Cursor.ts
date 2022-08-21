import CursorShader from '../../renderer/shader/cursor/CursorShader';
import CameraInterface from '../camera/CameraInterface';
import CubeModel from '../model/CubeModel';
import Model from '../model/Model';
import BlockNames from '../../data/block-name';
import BlockID from '../../data/block-id';
import Container, { ServiceName } from '../../Container';
import SceneObject from '../SceneObject';
import getBlockFromRay from '../../../utility/get-block-from-ray';

export default class Cursor extends SceneObject {

    static OFFSET = 0.5;

    private model?: Model;
    private camera: CameraInterface;
    private shader!: CursorShader;

    constructor() {
        super();

        this.camera = Container.getService(ServiceName.SCENE).getCamera();

    }

    public createModel() {
        const model = CubeModel.create();
        model.scale.set(1.001, 1.001, 1.001);

        this.model = model;
    }

    public createShader(): void {
        this.shader = new CursorShader(this.camera, this);
    }

    public update(): void {
        const world = Container.getService(ServiceName.WORLD).getWorld();

        if (!world) {
            throw new Error('[Scene:Cursor] Missing required property "World"!');
        }

        const { model, camera } = this,
              block = getBlockFromRay(camera.transform.position, camera.ray.fromScreen().ray);

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