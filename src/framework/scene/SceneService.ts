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
import CameraInterface from './camera/CameraInterface';
import PlayerController from '../player/PlayerController';

export default class SceneService implements ServiceInterface {

    private scene?: Scene;
    private camera?: CameraInterface;
    private world?: World;
    private cursor?: Cursor;
    private skybox?: Skybox;

    private controller?: PlayerController;

    // @ts-ignore
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

        createDebugWorld(world);

        scene.addEntities(camera, skybox, world, cursor);

        this.skybox = skybox;
        this.scene = scene;
        this.camera = camera;
        this.world = world;
        this.cursor = cursor;

        const playerEntity = Container.getService(ServiceName.ENTITY).getPlayer()!;
        this.controller = new PlayerController(camera, playerEntity, world);

        scene.addEntity(this.controller);

        playerEntity.setPosition(new Vector3(-2, 7, -2));

        Container.getService(ServiceName.RENDERER).setScene(scene);
    }

    public async discard(): Promise<void> {

    }

    public getScene() {
        return this.scene;
    }

    public getWorld() {
        return this.world;
    }

    public getCamera() {
        return this.camera;
    }

    public getCursor() {
        return this.cursor;
    }

    public getSkybox() {
        return this.skybox;
    }

    public getController() {
        return this.controller;
    }
}