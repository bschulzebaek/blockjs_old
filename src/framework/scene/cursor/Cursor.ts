import getCellFromRay from '../../../utility/get-cell-from-ray';
import CursorShader from '../../renderer/shader/cursor/CursorShader';
import CameraInterface from '../camera/CameraInterface';
import CubeModel from '../model/CubeModel';
import Model from '../model/Model';
import WorldInterface from '../world/WorldInterface';
import CursorInterface from './CursorInterface';


export default class Cursor implements CursorInterface {

    public model?: Model;

    private context: WebGL2RenderingContext;
    private camera: CameraInterface;
    private world: WorldInterface | null = null;
    private shader: CursorShader;

    constructor(context: WebGL2RenderingContext, camera: CameraInterface, world: WorldInterface) {
        this.context = context;
        this.camera = camera;
        this.world = world;

        this.model = this.createModel(context);
        this.shader = new CursorShader(context, camera, this);
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

        const { camera, world, model, context } = this,
              ray = camera.ray.fromScreen(),
              block = getCellFromRay(world, camera.transform.position, ray.ray);

        if (block?.blockId > 0) {
            if (!model) {
                this.model = this.createModel(context);
            }

            this.model?.position.set(block.x, block.y, block.z);
            this.model?.position.add(0.5, 0.5, 0.5);
            this.model?.update();
            this.shader.run();
        } else {
            delete this.model;
        }
    }

    private createModel(context: WebGL2RenderingContext): Model {
        const model = CubeModel.create(context);
        model.scale.set(1.001, 1.001, 1.001);

        return model;
    }

    public remove(): void {
        delete this.model;
    }
}