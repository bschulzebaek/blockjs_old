import ServiceInterface from '../ServiceInterface';
import StorageAdapter from '../storage/StorageAdapter';
import Scene from './Scene';
import ControlledCamera from './camera/ControlledCamera';
import Skybox from './skybox/Skybox';
import Container, { ServiceName } from '../Container';
import World from './world/World';
import createDebugWorld from '../world-generation/debug-world';
import Vector3 from '../../math/Vector3';
import Cursor from './cursor/Cursor';

export default class SceneService implements ServiceInterface {

    private scene?: Scene;

    private context!: WebGL2RenderingContext;

    constructor(adapter: StorageAdapter) {

    }

    public async create() {

    }

    public createSceneEntities(canvas: HTMLCanvasElement): void {
        const context = canvas.getContext('webgl2')!,
              width = window.innerWidth,
              height = window.innerHeight;

        this.context = context;

        canvas.width = width;
        canvas.height = height;

        context.viewport(0, 0, window.innerWidth, window.innerHeight);

        context.clearColor(0, 0, 0, 1.0);
        context.enable(context.DEPTH_TEST);
        context.enable(context.CULL_FACE);
        context.depthFunc(context.LEQUAL);
        context.blendFunc(context.SRC_ALPHA, context.ONE_MINUS_SRC_ALPHA);

        const scene   = new Scene(context),
              camera  = new ControlledCamera(context, 70, 0.05, 300.0),
              skybox  = new Skybox(context, camera),
              world   = new World(context, camera),
              cursor  = new Cursor(context, camera, world);

        // player
        // inventory

        createDebugWorld(world);

        camera.setPosition(new Vector3(8, 4, 12));
        camera.transform.rotation.y = 0;

        scene.addEntities(camera, skybox, world, cursor);

        this.scene = scene;

        Container.getService(ServiceName.RENDERER).setScene(scene);
    }

    public async discard(): Promise<void> {

    }

    public getScene() {
        return this.scene;
    }

    public getContext() {
        return this.context;
    }
}