import SceneObjectInterface from './SceneObjectInterface';
import type Camera from '../scene-content/camera/Camera';
import Loop from '../../shared/utility/Loop';
import syncRenderObject, { SyncAction } from '../helper/sync-render-object';
import { CAMERA_ID } from '../../data/scene-data';

export default class Scene {
    private sceneObjects: Map<string, SceneObjectInterface> = new Map();
    private loop = new Loop(this.update.bind(this));

    public getCamera() {
        return this.sceneObjects.get(CAMERA_ID) as Camera;
    }

    public setCamera(camera: Camera) {
        this.sceneObjects.set(CAMERA_ID, camera);
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
        this.sceneObjects.forEach((sceneObject) => {
            sceneObject.update(delta);

            const data = sceneObject.getRenderData ?
                sceneObject.getRenderData() :
                null;

            syncRenderObject(
                data ? SyncAction.UPSERT : SyncAction.DELETE,
                sceneObject.getId(),
                data,
            );
        });
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
