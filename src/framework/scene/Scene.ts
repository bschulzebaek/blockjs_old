import SceneInterface from './SceneInterface';
import Container, { ServiceName } from '../container/Container';
import Camera from '../../client/camera/Camera';
import Skybox from '../../world/skybox/Skybox';
import Cursor from '../../client/cursor/Cursor';
import PlayerController from '../../player/PlayerController';
import SceneObjectInterface from './SceneObjectInterface';

export default class Scene implements SceneInterface {
    private sceneObjects: Map<string, SceneObjectInterface> = new Map();

    public addSceneObject = (sceneObject: SceneObjectInterface) => {
        this.sceneObjects.set(sceneObject.getId(), sceneObject);
    }

    public addSceneObjects = (...sceneObjects: SceneObjectInterface[]) =>  {
        sceneObjects.forEach(this.addSceneObject);
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

    public beforePlay() {
        this.createSceneObjects();

        this.sceneObjects.forEach((sceneObject) => {
            if (sceneObject.createModel) {
                sceneObject.createModel();
            }
        });

        Container.getShaderRegistry().compileShaders();

        this.sceneObjects.forEach((sceneObject) => {
            if (sceneObject.createShaderReference) {
                sceneObject.createShaderReference();
            }
        });
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
        this.sceneObjects.forEach((sceneObject) => {
            sceneObject.update(delta);
        });
    }

    private createSceneObjects() {
        const camera = new Camera(70, 0.05, 300.0),
              skybox = new Skybox(camera),
              cursor = new Cursor(camera),
              world  = Container.getService(ServiceName.WORLD).getWorld(),
              player = new PlayerController(
                  camera,
                  Container.getService(ServiceName.ENTITY).getPlayer()!,
              );

        this.addSceneObjects(camera, skybox, world, cursor, player);
    }
}