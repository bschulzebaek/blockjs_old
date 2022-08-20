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

    private world?: World;

    constructor(adapter: StorageAdapter) {

    }

    public async create() {

    }

    public createSceneEntities(): void {
        const scene   = new Scene(),
              camera  = new ControlledCamera(70, 0.05, 300.0),
              skybox  = new Skybox(camera),
              world   = new World(camera),
              cursor  = new Cursor(camera, world);

        // player
        // inventory

        createDebugWorld(world);

        camera.setPosition(new Vector3(-2, 6, -2));
        camera.transform.rotation.y = 0;

        scene.addEntities(camera, skybox, world, cursor);

        this.scene = scene;
        this.world = world;

        Container.getService(ServiceName.RENDERER).setScene(scene);
    }

    public async discard(): Promise<void> {

    }

    public getScene() {
        return this.scene;
    }

    public getPlayer() {

    }

    public getWorld() {

    }
}