import SceneObjectInterface from './SceneObjectInterface';
export default interface SceneInterface {
    addSceneObject(sceneObject: SceneObjectInterface): void;
    addSceneObjects(...sceneObjects: SceneObjectInterface[]): void;
    getSceneObject(id: string): SceneObjectInterface;
    beforePlay(): void;
    discard(): Promise<void>;
    update(delta: number): void;
}