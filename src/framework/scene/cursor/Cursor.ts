import getCellFromRay from '../../../utility/get-cell-from-ray';
import CursorShader from '../../renderer/shader/cursor/CursorShader';
import CameraInterface from '../camera/CameraInterface';
import CubeModel from '../model/CubeModel';
import Model from '../model/Model';
import WorldInterface from '../world/WorldInterface';
import CursorInterface from './CursorInterface';


export default class Cursor implements CursorInterface {

    static OFFSET = 0.5;

    public model?: Model;

    private camera: CameraInterface;
    private world: WorldInterface;
    private shader: CursorShader;

    constructor(camera: CameraInterface, world: WorldInterface) {
        this.camera = camera;
        this.world = world;

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

        const { camera, world, model } = this,
              ray = camera.ray.fromScreen(),
              block = getCellFromRay(world, camera.transform.position, ray.ray);

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

        console.log(`[CURSOR] Position ${block.x}:${block.y}:${block.z} (x:y:z)`)
        console.log('[CURSOR] BlockID: ' + this.world.getBlockId(block.x, block.y, block.z))

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
    }
}