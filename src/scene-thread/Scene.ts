import SceneObjectInterface from './SceneObjectInterface';
import Camera from './scene-content/camera/Camera';
import Skybox from './scene-content/skybox/Skybox';
import Loop from '../shared/utility/Loop';
import { Vector3 } from '../shared/math';
import Cursor from './scene-content/cursor/Cursor';
import Message from '../shared/utility/Message';
import { RenderMessages } from '../shared/messages/ThreadMessages';
import SceneContainer from './SceneContainer';
import toRawRenderObject from './helper/to-raw-render-object';

export default class Scene {
    private camera!: Camera;
    private sceneObjects: Map<string, SceneObjectInterface> = new Map();
    private loop = new Loop(this.update.bind(this));

    constructor() {
        this.createSceneObjects();
        this.createModels();
    }

    public getCamera() {
        return this.camera;
    }

    public setCamera(camera: Camera) {
        this.camera = camera;
    }

    public start() {
        this.loop.start();
    }

    public stop() {
        this.loop.stop();
    }

    public addSceneObject = (sceneObject: SceneObjectInterface) => {
        this.sceneObjects.set(sceneObject.getId(), sceneObject);
    }

    public addSceneObjects = (...sceneObjects: SceneObjectInterface[]) => {
        sceneObjects.forEach(this.addSceneObject);
    }

    public getSceneObject(id: string) {
        if (!this.sceneObjects.has(id)) {
            throw new Error(`[Scene] SceneObject with id "${id}" does not exist!`);
        }

        return this.sceneObjects.get(id) as SceneObjectInterface;
    }

    public getSceneObjects() {
        return Array.from(this.sceneObjects.values());
    }

    public deleteSceneObject(id: string) {
        const so = this.getSceneObject(id);
        this.sceneObjects.delete(id);

        if (!so.discard) {
            return;
        }

        so.discard();
    }

    public update(delta: number): void {
        setTimeout(this.camera.update);

        this.sceneObjects.forEach((sceneObject) => {
            sceneObject.update(delta);
        });

        this.syncToRenderer();
    }

    private createSceneObjects() {
        const camera = new Camera(70, 0.05, 300.0),
            skybox = new Skybox(),
            cursor = new Cursor();

        camera.setPosition(new Vector3(0, 8, 0));

        this.camera = camera;

        this.addSceneObjects(skybox, cursor);
    }

    private createModels() {
        this.sceneObjects.forEach((sceneObject) => {
            if (sceneObject.createModel) {
                sceneObject.createModel();
            }
        });
    }

    private syncToRenderer() {
        Message.send(
            RenderMessages.SYNC_SCENE,
            Array.from(this.sceneObjects.values()).map(toRawRenderObject).filter(ro => !!ro),
            SceneContainer.getRenderPort(),
        );
    }

    public async discard(): Promise<void> {
        const sceneObjects = Array.from(this.sceneObjects.values());

        Promise.allSettled(sceneObjects.map((sceneObject) => {
            if (sceneObject.discard) {
                return sceneObject.discard();
            }

            return undefined;
        }));
    }
}
