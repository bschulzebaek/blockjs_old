import ServiceInterface from '../ServiceInterface';
import StorageAdapter from '../storage/StorageAdapter';
import Scene from './Scene';
import Skybox from './skybox/Skybox';
import Cursor from './cursor/Cursor';
import CameraInterface from './camera/CameraInterface';
import PlayerController from '../player/PlayerController';
import Camera from './camera/Camera';
import { SceneEntity } from './Scene';

export default class SceneService implements ServiceInterface {

    private scene!: Scene;
    private camera!: CameraInterface;
    private skybox!: Skybox;
    private cursor!: Cursor;

    private controller!: PlayerController;

    // @ts-ignore
    constructor(adapter: StorageAdapter) {

    }

    public async create() {

    }

    public createSceneEntities() {
        this.camera = new Camera(70, 0.05, 300.0);

        this.skybox = new Skybox(this.camera);
        this.cursor  = new Cursor(this.camera);

        this.scene = new Scene(this.camera, this.skybox, this.cursor);
    }

    public async discard(): Promise<void> {

    }

    public addEntity(sceneEntity: SceneEntity) {
        this.scene.addEntities(sceneEntity);
    }

    public getScene() {
        return this.scene;
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

    public setController(controller: PlayerController) {
        this.controller = controller;
        this.scene.addEntity(controller);
    }

    public getController() {
        return this.controller;
    }
}