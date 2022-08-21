import getCellFromRay from '../../../utility/get-cell-from-ray';
import CursorShader from '../../renderer/shader/cursor/CursorShader';
import CameraInterface from '../camera/CameraInterface';
import CubeModel from '../model/CubeModel';
import Model from '../model/Model';
import WorldInterface from '../world/WorldInterface';
import CursorInterface from './CursorInterface';
import BlockNames from '../../data/block-name';
import BlockID from '../../data/block-id';
import Container, { ServiceName } from '../../Container';


export default class Cursor implements CursorInterface {

    static OFFSET = 0.5;

    public model?: Model;

    private camera: CameraInterface;
    private world: WorldInterface;
    private shader: CursorShader;

    constructor(camera: CameraInterface) {
        this.camera = camera;
        this.world = Container.getService(ServiceName.WORLD).getWorld();

        this.model = this.createModel();
        this.shader = new CursorShader(camera, this);
    }

    public setCamera(camera: CameraInterface): void {
        this.camera = camera;
    }

    public update(): void {
        if (!this.camera) {
            throw new Error('[Scene:Cursor] Missing required property "Camera"!');
        }

        if (!this.world) {
            throw new Error('[Scene:Cursor] Missing required property "World"!');
        }

        const { camera, model } = this,
              block = getCellFromRay(camera.transform.position, camera.ray.fromScreen().ray);

        if (!block || block.blockId < 1) {
            return this.remove();
        }

        if (!model) {
            this.model = this.createModel();
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

    private createModel(): Model {
        const model = CubeModel.create();
        model.scale.set(1.001, 1.001, 1.001);

        return model;
    }

    public remove(): void {
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
}