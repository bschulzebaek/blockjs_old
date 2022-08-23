import Scene from './Scene';
import Skybox from '../../content/skybox/Skybox';
import Cursor from '../../content/cursor/Cursor';
import PlayerController from '../player/PlayerController';
import SceneObject from './SceneObject';
import Service from '../Service';
import CameraInterface from '../../content/camera/CameraInterface';
import Camera from '../../content/camera/Camera';

export default class SceneService extends Service {

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

        this.skybox = new Skybox(this.camera);
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