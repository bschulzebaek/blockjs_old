import SceneObjectInterface from './SceneObjectInterface';
import Camera from '../scene-content/camera/Camera';
import Skybox from '../scene-content/skybox/Skybox';
import { RenderMessages } from '../engine/threads/ThreadMessages';
import Loop from '../shared/utility/Loop';
import { Vector3 } from '../shared/math';
import SceneWorld from './SceneWorld';
import PlayerController from '../scene-content/player/PlayerController';
import Entity from './entity/Entity';
import SceneContainer from './SceneContainer';
import Cursor from '../scene-content/cursor/Cursor';

export default class Scene {
    private camera!: Camera;
    private sceneObjects: Map<string, SceneObjectInterface> = new Map();
    private loop = new Loop(this.update.bind(this));

    private world = new SceneWorld();

    constructor() {
        this.createSceneObjects();
        this.createModels();
    }

    public getCamera() {
        return this.camera;
    }

    public getWorld() {
        return this.world;
    }

    public syncWorld(data: any) {
        this.world.setChunks(data);
    }

    // @ts-ignore
    public start({ isNew }: { isNew: boolean }) {
        // console.log(isNew)
        this.loop.start();
    }

    public stop() {
        this.loop.stop();
    }

    public addSceneObject = (sceneObject: SceneObjectInterface) => {
        this.sceneObjects.set(sceneObject.getId(), sceneObject);
    }

    public addSceneObjects = (...sceneObjects: SceneObjectInterface[]) =>  {
        sceneObjects.forEach(this.addSceneObject);
    }

    public getRendererData() {
        const { camera } = this;

        const sceneObjects = Array.from(this.sceneObjects.values()).map((sceneObject) => {
            if (!sceneObject || !sceneObject.model || !sceneObject.getShader) {
                return null;
            }

            return {
                shader: sceneObject.getShader(),
                view: new Float32Array(sceneObject.model.view!),
                indices: sceneObject.model.mesh.indices,
                vertices: sceneObject.model.mesh.vertices,
                normals: sceneObject.model.mesh.normals,
                uvs: sceneObject.model.mesh.uvs,
                faces: sceneObject.model.mesh.faces,
                arrayObj: sceneObject.model.mesh.arrayObj,
            }
        }).filter((so) => !!so);

        return {
            view: new Float32Array(camera.getView()),
            projection: new Float32Array(camera.getProjectionMatrix()),
            objects: sceneObjects
        }
    }

    public getSceneObject(id: string) {
        if (!this.sceneObjects.has(id)) {
            throw new Error(`[Scene] SceneObject with id "${id}" does not exist!`);
        }

        return this.sceneObjects.get(id) as SceneObjectInterface;
    }

    public deleteSceneObject(id: string) {
        if (!this.sceneObjects.has(id)) {
            throw new Error(`[Scene] SceneObject with id "${id}" does not exist!`);
        }

        this.sceneObjects.delete(id);
    }

    public async discard(): Promise<void> {
        const sceneObjcets = Array.from(this.sceneObjects.values());

        Promise.allSettled(sceneObjcets.map((sceneObjcet) => {
            if (sceneObjcet.discard) {
                return sceneObjcet.discard();
            }

            return undefined;
        }));
    }

    public update(delta: number): void {
        this.camera.update();
        //
        this.sceneObjects.forEach((sceneObject) => {
            sceneObject.update(delta);
        });

        SceneContainer.getRenderPort().postMessage({
            action: RenderMessages.SYNC_SCENE,
            detail: this.getRendererData()
        });
    }

    private createSceneObjects() {
        const camera = new Camera(70, 0.05, 300.0),
              skybox = new Skybox(camera),
              cursor = new Cursor(camera),
              player = new PlayerController(
                  camera,
                  new Entity('player', this.world, new Vector3(0, 8, 0)),
                  this.world,
              );

        camera.setPosition(new Vector3(0, 8, 0));

        this.camera = camera;

        // @ts-ignore
        this.addSceneObjects(skybox, player, cursor);
    }

    private createModels() {
        this.sceneObjects.forEach((sceneObject) => {
            if (sceneObject.createModel) {
                sceneObject.createModel();
            }
        });
    }
}