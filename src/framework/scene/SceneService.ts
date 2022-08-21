import ServiceInterface from '../ServiceInterface';
import Scene from './Scene';
import Skybox from './skybox/Skybox';
import Cursor from './cursor/Cursor';
import CameraInterface from './camera/CameraInterface';
import PlayerController from '../player/PlayerController';
import Camera from './camera/Camera';
import SceneObject from './SceneObject';

export default class SceneService implements ServiceInterface {

    private scene!: Scene;
    private camera!: CameraInterface;
    private skybox!: Skybox;
    private cursor!: Cursor;

    private controller!: PlayerController;

    public async create() {
        this.createSceneEntities();
    }

    public beforePlay() {
        const objects = [
            this.skybox,
            this.cursor,
            this.controller,
            ...this.scene.getEntities()
        ];

        objects.forEach((item) => {
            item.createModel();
            item.createShader();
        });
    }

    private createSceneEntities() {
        this.camera = new Camera(70, 0.05, 300.0);

        this.skybox = new Skybox();
        this.cursor  = new Cursor();

        this.scene = new Scene(this.camera, this.skybox, this.cursor);
    }

    public async discard(): Promise<void> {
        this.controller.beforeDestroy();
    }

    public addEntity(sceneEntity: SceneObject) {
        this.scene.addEntities(sceneEntity);
    }

    public getScene() {
        return this.scene;
    }

    public getCamera() {
        return this.camera;
    }

    public setController(controller: PlayerController) {
        this.controller = controller;
        this.scene.addEntity(controller);
    }

    public getController() {
        return this.controller;
    }
}