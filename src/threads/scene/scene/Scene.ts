import SceneObjectInterface from './SceneObjectInterface';
import Loop from '../../../shared/utility/Loop';
import syncRenderObject, { SyncAction } from '../helper/sync-render-object';

export default class Scene {
    private sceneObjects: Map<string, SceneObjectInterface> = new Map();
    private loop = new Loop(this.update.bind(this));
    private deleteQueue: string[] = [];

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
        const sceneObject = this.getSceneObject(id);
        this.sceneObjects.delete(id);

        if (sceneObject.discard) {
            sceneObject.discard();
        }

        this.deleteQueue.push(id);
    }

    private consumeDeleteQueue() {
        this.deleteQueue.forEach((id) => {
            syncRenderObject(
                SyncAction.DELETE,
                id,
            );
        });

        this.deleteQueue = [];
    }

    public update(delta: number): void {
        this.consumeDeleteQueue();
        this.sceneObjects.forEach((sceneObject) => {
            sceneObject.update(delta);

            const data = sceneObject.getRenderData();

            if (!data) {
                return;
            }

            syncRenderObject(
                SyncAction.UPSERT,
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
